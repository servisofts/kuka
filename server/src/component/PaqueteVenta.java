package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Email.Email;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class PaqueteVenta {

    public PaqueteVenta(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getAllByUsuario":
                getAllByUsuario(data, session);
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
            case "subirFoto":
                subirFoto(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('paquete_venta','key_paquete','"+obj.getString("key_paquete")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getAllByUsuario(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select paquete_venta_get_all('"+obj.getString("key_usuario")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('paquete_venta','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_venta_getByKey", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject paquete_venta = obj.getJSONObject("data");
            paquete_venta.put("key",UUID.randomUUID().toString());
            paquete_venta.put("fecha_on",fecha_on);
            paquete_venta.put("estado",1);
            Conexion.insertArray("paquete_venta", new JSONArray().put(paquete_venta));
            
            JSONObject caja_activa = Caja.getActiva(obj.getString("key_usuario"));
            if(caja_activa == null){
                obj.put("estado", "error");
                obj.put("error", "sin_caja");
                return;
            }

            JSONObject cajaTipoPagoCuentaBanco = SucursalTipoPagoCuentaBanco.getByKeySucursal(caja_activa.getString("key_sucursal"));

            JSONArray clientes = obj.getJSONArray("clientes");
            JSONArray paquete_venta_usuarios = new JSONArray();
            JSONObject paquete_venta_usuario;

            JSONObject data;
            JSONObject caja_movimiento;


            JSONObject send_movimiento = new JSONObject();
            send_movimiento.put("component", "cajaMovimiento");
            send_movimiento.put("type", "registro");
            send_movimiento.put("key_usuario", obj.getString("key_usuario"));
            send_movimiento.put("estado", "exito");

            double monto;
            for (int i = 0; i < clientes.length(); i++) {
                paquete_venta_usuario = new JSONObject();
                paquete_venta_usuario.put("key", UUID.randomUUID().toString());
                paquete_venta_usuario.put("key_usuario",clientes.getJSONObject(i).getString("key"));
                paquete_venta_usuario.put("fecha_inicio",clientes.getJSONObject(i).getString("fecha_inicio"));
                paquete_venta_usuario.put("fecha_fin",clientes.getJSONObject(i).getString("fecha_fin"));
                paquete_venta_usuario.put("key_paquete_venta",paquete_venta.get("key"));
                paquete_venta_usuario.put("key_caja",caja_activa.get("key"));
                paquete_venta_usuario.put("fecha_on",formatter.format(new Date()));
                paquete_venta_usuario.put("estado",1);
                paquete_venta_usuarios.put(paquete_venta_usuario);


                data = clientes.getJSONObject(i).getJSONObject("data");
                monto=0;
                for (int j = 0; j < JSONObject.getNames(data).length; j++) {                    
                    try{
                        data.getJSONObject(JSONObject.getNames(data)[j]);
                        monto += data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto");
                        data.getJSONObject(JSONObject.getNames(data)[j]).put("key_paquete_venta_usuario", paquete_venta_usuario.getString("key"));
                        data.getJSONObject(JSONObject.getNames(data)[j]).put("key_tipo_pago", JSONObject.getNames(data)[j]);
                        data.getJSONObject(JSONObject.getNames(data)[j]).put("key_usuario", clientes.getJSONObject(i).getString("key"));

                        caja_movimiento = Caja.addVentaServicio(
                            caja_activa.getString("key"), 
                            obj.getString("key_usuario"), 
                            JSONObject.getNames(data)[j],
                            data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto"),
                            formatter.format(new Date()),
                            data.getJSONObject(JSONObject.getNames(data)[j])
                        );
                        send_movimiento.put("data", caja_movimiento);
                        SSServerAbstract.sendAllServer(send_movimiento.toString());

                        if(JSONObject.getNames(data)[j].equals("2") || JSONObject.getNames(data)[j].equals("3")){
                            
                            data.put("key_cuenta_banco", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(data)[j]).getString("key_cuenta_banco"));
                            caja_movimiento = Caja.addTraspasoBanco(
                                caja_activa.getString("key"), 
                                obj.getString("key_usuario"), 
                                JSONObject.getNames(data)[j],
                                data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto")*-1,
                                formatter.format(new Date()),
                                data.getJSONObject(JSONObject.getNames(data)[j])        
                            );
                            send_movimiento.put("data", caja_movimiento);
                            SSServerAbstract.sendAllServer(send_movimiento.toString());
                            

                            JSONObject cuentaBancoMovimiento = new JSONObject();
                            cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                            cuentaBancoMovimiento.put("descripcion", "Ingreso por cierre de caja");
                            cuentaBancoMovimiento.put("key_cuenta_banco", data.getString("key_cuenta_banco"));
                            cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
                            cuentaBancoMovimiento.put("monto", monto);
                            cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", caja_movimiento.getString("key")));
                            cuentaBancoMovimiento.put("fecha_on", formatter.format(new Date()));
                            cuentaBancoMovimiento.put("estado", 1);
                            Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));
                
                            JSONObject sendcuentaBancoMovimiento = new JSONObject();
                            sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
                            sendcuentaBancoMovimiento.put("type", "registro");
                            sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
                            sendcuentaBancoMovimiento.put("estado", "exito");
                            SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                        }


                        
                    }catch(Exception e){}
                }

                clientes.getJSONObject(i).put("monto", monto);
                //clientes.getJSONObject(i).put("key_tipo_pago", JSONObject.getNames(data)[j]);

            }
          
            
            Conexion.insertArray("paquete_venta_usuario", paquete_venta_usuarios);
            Conexion.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_registro", paquete_venta);

            paquete_venta.put("key_sucursal", caja_activa.getString("key_sucursal"));
            paquete_venta.put("key_usuario", caja_activa.getString("key_usuario"));

            obj.put("data", paquete_venta); 
            obj.put("clientes", paquete_venta_usuarios); 
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
            //SSServerAbstract.sendUsers(obj.toString(), new JSONArray().put(obj.getString("key_usuario")));
            

            JSONObject mail = new JSONObject();
            
            
            mail.put("__ID_PEDIDO__",paquete_venta.getString("key"));
            mail.put("__PAQUETE__",paquete_venta.getString("nombre_paquete"));
            mail.put("__KEY_PAQUETE__",paquete_venta.getString("key_paquete")+"?fecha="+new Date().toString());
            JSONObject cliente;
            for(int i = 0; i<clientes.length(); i++){
                cliente = clientes.getJSONObject(i);
                mail.put("__FECHA__",cliente.getString("fecha_inicio"));
                mail.put("__RENOVACION__",cliente.getString("fecha_fin"));
                mail.put("__MAIL__",cliente.getString("Correo"));
                mail.put("__KEY_USUARIO_CLIENTE__",paquete_venta_usuarios.getJSONObject(i).getString("key")+"?fecha="+new Date().toString());
                //mail.put("__KEY_TIPO_PAGO__",cliente.getString("key_tipo_pago"));
                mail.put("__MONTO__",cliente.getDouble("monto"));
                mail.put("__CI__",cliente.getString("CI"));
                new Email(Email.TIPO_RECIBO, mail);
            }
            

        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_venta = obj.getJSONObject("data");
            Conexion.editObject("paquete_venta", paquete_venta);
            Conexion.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_editar", paquete_venta);
            obj.put("data", paquete_venta);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"paquete_venta/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_venta_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }
}