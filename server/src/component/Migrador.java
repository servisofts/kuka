package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import conexion.Conexion;
import conexion.ConexionMySql;
import conexion.ConexionRolesPermisos;
import conexion.ConexionUsuario;

public class Migrador extends Thread {

    @Override
    public void run() {
        //sincronizarContactos();
        recrearMenbresias();
    }

    public static void recrearMenbresias(){
        try{

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            String consulta =  "delete from paquete_venta_usuario";
            Conexion.ejecutarUpdate(consulta);
            consulta =  "delete from paquete_venta";
            Conexion.ejecutarUpdate(consulta);

            consulta =  "select contratomembresia.*, paquete.precioPaquete as monto from contratomembresia, paquete where contratomembresia.idPaquete = paquete.idPaquete";
            PreparedStatement ps = ConexionMySql.preparedStatement(consulta);
            ResultSet rs = ps.executeQuery();
            String key_usuario;
            
            JSONObject paquete_venta_usuario;
            JSONObject paquete_venta;

            System.out.print("migrando");
            int error = 1;
            String idPaquete="";
            double monto=0;
            while(rs.next()){
                key_usuario = getKeyUsuarioIdMigracion(rs.getString("idCliente"));
                if(key_usuario.length()>0){

                    idPaquete = rs.getString("idPAquete");
                    monto = rs.getDouble("monto");

                    paquete_venta = new JSONObject();
                    paquete_venta.put("key", UUID.randomUUID().toString());
                    paquete_venta.put("monto", monto);
                    paquete_venta.put("key_paquete", idPaquete);
                    paquete_venta.put("fecha_on", fecha_on);
                    paquete_venta.put("estado", 1);
                    Conexion.insertArray("paquete_venta", new JSONArray().put(paquete_venta));

                    paquete_venta_usuario = new JSONObject();
                    paquete_venta_usuario.put("key", UUID.randomUUID().toString());
                    paquete_venta_usuario.put("fecha_inicio", rs.getString("fechaInicio"));
                    paquete_venta_usuario.put("fecha_fin", rs.getString("fechaFin"));
                    paquete_venta_usuario.put("key_usuario", key_usuario);
                    paquete_venta_usuario.put("key_paquete_venta", paquete_venta.getString("key"));
                    paquete_venta_usuario.put("fecha_on", fecha_on);
                    paquete_venta_usuario.put("estado", 1);
                    Conexion.insertArray("paquete_venta_usuario", new JSONArray().put(paquete_venta_usuario));

                    System.out.print(".");
                }else{
                    System.out.print(error);
                    error++;
                }
            }
            System.out.print("fin");
            
            rs.close();
            ps.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }

    private static String getKeyUsuarioIdMigracion(String id_cliente){
        try{
            String consulta = "SELECT CONCAT(trim(lower(contacto.nombre)),trim(lower(contacto.apellido))) as id_migracion\n"+
            "FROM contacto,\n"+
            "cliente\n"+
            "where cliente.idContacto = contacto.idContacto\n"+
            "and cliente.idCliente = "+id_cliente;
            PreparedStatement ps = ConexionMySql.preparedStatement(consulta);
            ResultSet rs = ps.executeQuery();
            String id_migracion = rs.next()?rs.getString("id_migracion"):"";
            rs.close();
            ps.close();


            consulta = "select key_usuario from usuario_tipo_usuario where usuario_tipo_usuario.id_migracion like '"+id_migracion+"'";
            ps = Conexion.preparedStatement(consulta);
            rs = ps.executeQuery();
            String key_usuario = rs.next()?rs.getString("key_usuario"):"";
            rs.close();
            ps.close();
            return key_usuario;
        }catch(Exception e){
            e.printStackTrace();
            return "";
        }
        
    }

    public static void sincronizarContactos() {
        try{
            ConexionUsuario.setConexion(Config.getJSON("data_base"));
            ConexionRolesPermisos.setConexion(Config.getJSON("data_base"));
            resetUsuario();
            String consulta =  "select contacto.*, CONCAT(trim(lower(contacto.nombre)),trim(lower(contacto.apellido))) as identificador from contacto";
            PreparedStatement ps = ConexionMySql.preparedStatement(consulta);
            ResultSet rs = ps.executeQuery();
            JSONObject usuario;
            JSONObject identificadores = new JSONObject();
            JSONObject data = new JSONObject();
            data.put("component","usuario");
            data.put("type","registro");
            data.put("version","2.0");
            data.put("estado","cargando");
            data.put("cabecera","registro_administrador");
            int a = 1;
            int error = 1;
            while(rs.next()){
                if(!identificadores.has(rs.getString("identificador"))){
                    usuario = new JSONObject();
                    usuario.put("CI", rs.getString("ci"));
                    usuario.put("Nombres", rs.getString("nombre").toLowerCase());
                    usuario.put("Apellidos", rs.getString("apellido").toLowerCase());
                    usuario.put("Telefono", "+591 "+rs.getString("telefono"));
                    if(rs.getString("correo").equals("")){
                        usuario.put("Correo", rs.getString("ci")+"@gmail.com");
                    }else{
                        usuario.put("Correo", rs.getString("correo"));
                    }
                    
                    usuario.put("Password", rs.getString("ci"));
                    if(rs.getString("edad")!=null)
                        usuario.put("Fecha nacimiento", rs.getDate("edad"));
                    else
                        usuario.put("Fecha nacimiento", "1800-01-01");
                        
                    data.put("data",usuario);
                    data.put("id_migracion",rs.getString("identificador"));
                 
                    a++;
                    data.put("i", a);
                    registro(data); 

                    identificadores.put(rs.getString("identificador"), true);
                    System.out.print(".");
                }else{
                    System.out.print(error);
                    error++;
                }
            }
            rs.close();
            ps.close();

            recrearMenbresias();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private static void addRol(String key_usuario) throws SQLException{
        String key_rol_cliente = "d16d800e-5b8d-48ae-8fcb-99392abdf61f";
        JSONObject usuario_rol = new JSONObject();
        usuario_rol.put("key", UUID.randomUUID().toString());
        usuario_rol.put("key_usuario", key_usuario);
        usuario_rol.put("key_rol", key_rol_cliente);
        usuario_rol.put("fecha_on", "now()");
        usuario_rol.put("estado", 1);
        ConexionRolesPermisos.insertArray("usuario_rol", new JSONArray().put(usuario_rol));
    }
    
    public static void resetUsuario() {
        String consulta = "delete from historico_dato where historico_dato.key_usuario in (\n" + "SELECT usuario.key\n"
                + "FROM usuario\n" + "where usuario.key_cabecera = 'd9354b72-4760-487f-b698-4a5f0e088f5e'\n" + ")";
        ConexionUsuario.ejecutarUpdate(consulta);

        consulta = "delete from usuario_tipo_usuario";
        Conexion.ejecutarUpdate(consulta);

        consulta = "delete from dato_login where dato_login.key_usuario in (\n" + "SELECT usuario.key\n"
                + "FROM usuario\n" + "where usuario.key_cabecera = 'd9354b72-4760-487f-b698-4a5f0e088f5e'\n" + ")";
        ConexionUsuario.ejecutarUpdate(consulta);

        consulta = "delete from usuario_dato where usuario_dato.key_usuario in (\n" + "SELECT usuario.key\n"
                + "FROM usuario\n" + "where usuario.key_cabecera = 'd9354b72-4760-487f-b698-4a5f0e088f5e'\n" + ")";
        ConexionUsuario.ejecutarUpdate(consulta);

        consulta = "delete from historico where historico.key_usuario in (\n" + "SELECT usuario.key\n"
                + "FROM usuario\n" + "where usuario.key_cabecera = 'd9354b72-4760-487f-b698-4a5f0e088f5e'\n" + ")";
        ConexionUsuario.ejecutarUpdate(consulta);

        consulta = "delete FROM usuario where usuario.key_cabecera = 'd9354b72-4760-487f-b698-4a5f0e088f5e'";
        ConexionUsuario.ejecutarUpdate(consulta);
    }

    public static void registro(JSONObject obj) {
        try {

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            JSONObject usuario = obj.getJSONObject("data");
            usuario.put("key", UUID.randomUUID().toString());
            usuario.put("tipo", 1);
            usuario.put("key_cabecera", 1);
            usuario.put("fecha_on", fecha_on);
            usuario.put("estado", 1);

            String consulta =  "select get_datos('b98d744a-6629-4c80-b513-f007c884e8e1', 'registro_administrador') as json";
            JSONArray datos = ConexionUsuario.ejecutarConsultaArray(consulta);

            JSONArray usuario_datos = new JSONArray();

            JSONObject usuario_dato;
            
            for (int i = 0; i < datos.length(); i++) {
                
                usuario_dato = new JSONObject();
                usuario_dato.put("key",UUID.randomUUID().toString());
                usuario_dato.put("key_usuario", usuario.getString("key"));
                usuario_dato.put("key_dato", datos.getJSONObject(i).getString("key"));
                usuario.put("key_cabecera", datos.getJSONObject(i).getString("key_cabecera"));
                usuario_dato.put("dato", usuario.get(datos.getJSONObject(i).getString("descripcion")).toString());
                usuario_dato.put("fecha_on", fecha_on);
                usuario_dato.put("estado", 1);
                usuario_datos.put(usuario_dato);
            }

            ConexionUsuario.insertArray("usuario", new JSONArray().put(usuario));
            ConexionUsuario.insertArray("usuario_dato", usuario_datos);
            String key_usuario = usuario.getString("key");
            if(obj.has("key_usuario")){
                key_usuario = obj.getString("key_usuario");
            }
            ConexionUsuario.historico(key_usuario, usuario.getString("key"), "usuarioV2_registro", usuario);
            
            JSONObject usuario_tipo_usuario = new JSONObject();
            usuario_tipo_usuario.put("key", UUID.randomUUID().toString());
            usuario_tipo_usuario.put("key_usuario", usuario.getString("key"));
            usuario_tipo_usuario.put("key_tipo_usuario", 1);
            usuario_tipo_usuario.put("fecha_on","now()");
            usuario_tipo_usuario.put("estado",1);
            usuario_tipo_usuario.put("id_migracion", obj.getString("id_migracion"));
            
            Conexion.insertArray("usuario_tipo_usuario", new JSONArray().put(usuario_tipo_usuario));    

            addRol(usuario.getString("key"));

            obj.put("data", usuario);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
}
