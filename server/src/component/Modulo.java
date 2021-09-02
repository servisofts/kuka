package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class Modulo {
    public Modulo(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
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
        try{
            String consulta =  "select modulo_get_all() as json";
            JSONObject modulo = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "modulo_getAll", new JSONObject());
            obj.put("data", modulo);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getJSONObject("data").getString("key");
            String consulta =  "select modulo_get_by_key('"+key+"') as json";
                JSONObject modulo = Conexion.ejecutarConsultaObject(consulta);
                Conexion.historico(obj.getString("key_usuario"), key, "modulo_getByKey", new JSONObject().put("key", key));
                obj.put("data", modulo);
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
            JSONObject modulo = obj.getJSONObject("data");
            modulo.put("key",key);
            modulo.put("key_usuario",obj.getString("key_usuario"));
            modulo.put("fecha_on","now()");
            modulo.put("estado",1);
            Conexion.insertArray("modulo", new JSONArray().put(modulo));
            Conexion.historico(obj.getString("key_usuario"),key, "modulo_regitro", modulo);
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            modulo.put("fecha_on", formatter.format(new Date()));
            obj.put("data", modulo);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject modulo = obj.getJSONObject("data");
            Conexion.editObject("modulo", modulo);
            Conexion.historico(obj.getString("key_usuario"),modulo.getString("key"), "modulo_editar", modulo);
            obj.put("data", modulo);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session)  {
        try{
           
            String url = Config.getJSON().getJSONObject("files").getString("url")+"modulo/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "modulo_subirFoto", new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
