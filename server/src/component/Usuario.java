package component;


import SocketCliente.SocketCliete;
import TipoDato.TipoDato;
import conexion.Conexion;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Usuario {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Usuario(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "insertarDato":
                insertarDato(data, session);
                break;
            case "getActivos":
                getActivos(data, session);
                break;
            case "identificacion":
                identificaion(data, session);
                break;
            case "recuperarPass":
                recuperarPass(data, session);
                break;
            case "subirFoto":
                subirFoto(data, session);
                break;
            default:
                defaultType(data, session);
        }
    }

    public void identificaion(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        String deviceKey = obj.getString("deviceKey");
        JSONObject data = obj.getJSONObject("data");
        try{
            session.setKeyDevice(deviceKey);    
            session.setKeyUsuario(data.getString("key"));
        }catch(Exception e){
            System.out.println("Sin usuario");
        }
        
        obj.put("estado", "exito");
    }

    public void getActivos(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all_clientes_activos() as json";
            JSONObject file = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", file);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void recuperarPass(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = new JSONObject();
        data.put("key", "sa323-23r2r-2r-23r-23r");
        obj.put("data", data);
        obj.put("estado", "exito");
    }


    public void registro(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;

        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }

        SocketCliete.send("usuario", obj, session);

    }

    public void insertarDato(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;
        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            objData.put("key_usuario", obj.getString("key_usuario"));
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }
        SocketCliete.send("usuario", obj, session);

    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {

        SocketCliete.send("usuario", obj, session);

    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url")+"usuario/";
        File f = new File(url);
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key_usuario"),"usuario_subirFoto",new JSONObject().put("url", new JSONArray().put(f.getPath()+"/"+obj.getString("key"))));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
    }

    public void nuevoUsuario(JSONObject obj, SSSessionAbstract session) {
         String url = Config.getJSON().getJSONObject("files").getString("url")+"usuario/";
        File f = new File(url);
        if(!f.exists()) f.mkdirs();

        try{
            JSONObject cliente = new JSONObject();
            String key = UUID.randomUUID().toString();
            cliente.put("key", key);
            cliente.put("key_usuario", obj.getString("key_usuario"));
            cliente.put("descripcion", "cliente_nuevo");
            cliente.put("fecha_on", "now()");
            cliente.put("estado", 1);
            Conexion.insertArray("cliente", new JSONArray().put(cliente));

            Conexion.historico(obj.getString("key_usuario"), obj.getString("key_usuario"),"usuario_registro",new JSONObject().put("hola", "Bien venido a la estructura Servisofts."));

            obj.put("data", cliente);
            obj.put("key_usuario", obj.getString("key_usuario"));
            obj.put("estado", "exito");

        }catch(Exception e){
            e.printStackTrace();
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
        
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());

    }
}