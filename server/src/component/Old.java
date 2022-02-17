package component;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;
import conexion.ConexionMySql;
import conexion.ConexionUsuario;

public class Old {
    public Old(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getTables":
                getTables(data, session);
            break;
            case "bdInfo":
                bdInfo(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
            break;
            case "registro":
                registro(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "anular":
                anular(data, session);
            break;
            case "subir":
                subir(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    
    public static void usuariosToCliente() {
        try{
            ConexionUsuario.setConexion(Config.getJSON("data_base"));
            String consulta =  "select v2_get_all('b98d744a-6629-4c80-b513-f007c884e8e1','registro_administrador') as json";
            JSONObject usuarios = ConexionUsuario.ejecutarConsultaObject(consulta);
            String names[] = JSONObject.getNames(usuarios);
            JSONObject usuario;
            for (int i = 0; i < names.length; i++) {
                usuario = usuarios.getJSONObject(names[i]);
                System.out.println(usuario.toString());
            } 
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getTables(JSONObject obj, SSSessionAbstract session) {
        try{
            String consulta =  "select file_get_all('"+obj.getString("key_usuario")+"') as json";
            JSONObject file = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", file);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
    public void bdInfo(JSONObject obj, SSSessionAbstract session) {
        try{
            String consulta =  "show tables";
            PreparedStatement ps = ConexionMySql.preparedStatement(consulta);
            ResultSet rs = ps.executeQuery();
            JSONObject show = new JSONObject();
            while(rs.next()){                
                show.put(rs.getString(1),new JSONObject());
            }
            rs.close();
            ps.close();
            

            JSONObject desc;
            JSONArray descs;
            for (int i = 0; i < JSONObject.getNames(show).length; i++) {
                consulta = "desc "+JSONObject.getNames(show)[i];
                ps = ConexionMySql.preparedStatement(consulta);
                rs = ps.executeQuery();
                descs = new JSONArray();
                while(rs.next()){
                    desc = new JSONObject();
                    desc.put("Field", rs.getString("Field"));
                    desc.put("Type", rs.getString("Type"));
                    desc.put("Null", rs.getString("Null"));
                    desc.put("Key", rs.getString("Key"));
                    descs.put(desc);
                }
                show.put((JSONObject.getNames(show)[i]),descs);
                rs.close();
                ps.close();
            }

            consulta =  "SHOW PROCEDURE STATUS";
            ps = ConexionMySql.preparedStatement(consulta);
            rs = ps.executeQuery();
            JSONArray procedures = new JSONArray();
            while(rs.next()){                
                procedures.put(rs.getString("Name"));
            }
            rs.close();
            ps.close();

            JSONObject data = new JSONObject();
            data.put("procedures", procedures);
            data.put("tables", show);


            obj.put("data", data);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select file_get_by_key('"+obj.getJSONArray("path")+"') as json";
                JSONObject file = Conexion.ejecutarConsultaObject(consulta);
                obj.put("data", file);
                obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            

            String key = UUID.randomUUID().toString();
            JSONObject file = obj.getJSONObject("data");
            file.put("key",key);
            file.put("fecha_on","now()");
            file.put("estado",1);
            file.put("tipo",0);
            file.put("posx", 0);
            file.put("posy", 0);
            
            Conexion.insertArray("file", new JSONArray().put(file));
            JSONObject file_tipo_seguimiento = new JSONObject();
            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
            file_tipo_seguimiento.put("descripcion","crear_carpeta");
            file_tipo_seguimiento.put("key_tipo_seguimiento","1");
            file_tipo_seguimiento.put("data",file.toString());
            file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
            file_tipo_seguimiento.put("key_file",key);
            file_tipo_seguimiento.put("fecha","now()");
            file_tipo_seguimiento.put("estado",1);

            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

            JSONObject observador = new JSONObject();
            observador.put("key",UUID.randomUUID().toString());
            observador.put("key_usuario",obj.getString("key_usuario"));
            observador.put("descripcion","Creador");
            observador.put("tipo",1);
            observador.put("key_file",key);
            observador.put("fecha_on","now()");
            observador.put("estado",1);
            Conexion.insertArray("observador", new JSONArray().put(observador));

            obj.put("data", file);
            obj.put("estado", "exito");
            SSServerAbstract.sendUsers(obj.toString(), new JSONArray().put(obj.getString("key_usuario")));
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject file = obj.getJSONObject("data");
            Conexion.editObject("file", file);
            obj.put("data", file);
            obj.put("estado", "exito");
            

            JSONObject file_tipo_seguimiento = new JSONObject();
            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
            file_tipo_seguimiento.put("descripcion",obj.getString("tipo_seguimiento"));
            file_tipo_seguimiento.put("data",file.toString());
            file_tipo_seguimiento.put("key_tipo_seguimiento","2");
            file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
            file_tipo_seguimiento.put("key_file",file.getString("key"));
            file_tipo_seguimiento.put("fecha","now()");
            file_tipo_seguimiento.put("estado",1);

            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

            String consulta =  "select get_observadores('"+file.getString("key")+"') as json";
            JSONArray observadores = Conexion.ejecutarConsultaArray(consulta);

            SSServerAbstract.sendUsers(obj.toString(), observadores);
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void anular(JSONObject obj, SSSessionAbstract session) {
        try {
            Conexion.anular("modulo", obj.getJSONObject("data").getString("key"));


            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subir(JSONObject obj, SSSessionAbstract session)  {
        try{
            String key_file_padre =  "";
            if(obj.getJSONArray("path").length()>0){
                key_file_padre =  obj.getJSONArray("path").getJSONObject(obj.getJSONArray("path").length()-1).getString("key");    
            }
            String url = Config.getJSON().getJSONObject("files").getString("url")+obj.getString("key_usuario")+"/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            for (int i = 0; i < obj.getJSONArray("path").length(); i++) {
                key_file_padre=obj.getJSONArray("path").getJSONObject(i).getString("key");
                url+=key_file_padre+"/";
            }
            f = new File(url);
            if(!f.exists()) f.mkdirs();
            
            JSONArray documentos = new JSONArray();

            String filename,key;
            JSONObject file;
            JSONArray direcciones = new JSONArray();
            for(int i=0; i<obj.getJSONArray("documentos").length(); i++){
                filename = obj.getJSONArray("documentos").getString(i);
                
                key = UUID.randomUUID().toString();
                file = new JSONObject();
                file.put("key", key);
                file.put("descripcion", filename);
                file.put("fecha_on", "now()");
                file.put("posx", 0);
                file.put("posy", 0);
                file.put("estado", 1);
                file.put("tipo",1);

                if(obj.has("positions")){
                    JSONArray positions = obj.getJSONArray("positions");
                    JSONObject pos = positions.getJSONObject(i);
                    file.put("posx", pos.getDouble("x"));
                    file.put("posy", pos.getDouble("y"));
                }

                if(key_file_padre.length()>0){
                    file.put("key_file",key_file_padre);
                }
                
                Conexion.insertArray("file", new JSONArray().put(file));
                documentos.put(file);
                direcciones.put(f.getPath()+"/"+key);

                JSONObject file_tipo_seguimiento = new JSONObject();
                file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                file_tipo_seguimiento.put("key_tipo_seguimiento","1");
                file_tipo_seguimiento.put("descripcion","crear_file");
                file_tipo_seguimiento.put("data",file.toString());
                file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
                file_tipo_seguimiento.put("key_file",key);
                file_tipo_seguimiento.put("fecha","now()");
                file_tipo_seguimiento.put("estado",1);

                Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

                JSONObject observador = new JSONObject();
                observador.put("key",UUID.randomUUID().toString());
                observador.put("key_usuario",obj.getString("key_usuario"));
                observador.put("descripcion","Creador");
                observador.put("tipo",1);
                observador.put("key_file",key);
                observador.put("fecha_on","now()");
                observador.put("estado",1);
                Conexion.insertArray("observador", new JSONArray().put(observador));
            }
            obj.put("dirs", direcciones);
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendUsers(obj.toString(), new JSONArray().put(obj.getString("key_usuario")));
            //SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
