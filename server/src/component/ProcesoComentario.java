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

public class ProcesoComentario {
    public ProcesoComentario(JSONObject data, SSSessionAbstract session) {
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
            String consulta =  "select proceso_comentario_get_all('"+obj.getString("key_proceso")+"') as json";
            JSONObject proceso_comentario = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key_proceso"), "proceso_comentario_getAll", new JSONObject());
            obj.put("data", proceso_comentario);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getString("key");
            String consulta =  "select proceso_comentario_get_by_key('"+key+"') as json";
                JSONObject proceso = Conexion.ejecutarConsultaObject(consulta);
                Conexion.historico(obj.getString("key_usuario"), key, "proceso_comentario_getByKey", new JSONObject().put("key", key));
                obj.put("data", proceso);
                obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            String key = UUID.randomUUID().toString();
            JSONObject proceso_comentario = obj.getJSONObject("data");
            proceso_comentario.put("key",key);
            proceso_comentario.put("fecha_on",fecha_on);
            proceso_comentario.put("estado",1);
            Conexion.insertArray("proceso_comentario", new JSONArray().put(proceso_comentario));
            Conexion.historico(obj.getString("key_usuario"),key, "proceso_comentario_regitro", proceso_comentario);
            
            obj.put("data", proceso_comentario);
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
            JSONObject proceso_comentario = obj.getJSONObject("data");
            Conexion.editObject("proceso_comentario", proceso_comentario);
            Conexion.historico(obj.getString("key_usuario"),proceso_comentario.getString("key"), "proceso_comentario_editar", proceso_comentario);
            obj.put("data", proceso_comentario);
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
           
            String url = Config.getJSON().getJSONObject("files").getString("url")+"proceso_comentario/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "proceso_comentario_subirFoto", new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
