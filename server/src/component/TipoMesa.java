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

public class TipoMesa {
    public TipoMesa(JSONObject data, SSSessionAbstract session) {
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
            String consulta =  "select get_all('tipo_mesa') as json";
            JSONObject tipo_mesa = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", tipo_mesa);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getJSONObject("data").getString("key");
            String consulta =  "select tipo_mesa_get_by_key('"+key+"') as json";
                JSONObject tipo_mesa = Conexion.ejecutarConsultaObject(consulta);
                Conexion.historico(obj.getString("key_usuario"), key, "tipo_mesa_getByKey", new JSONObject().put("key", key));
                obj.put("data", tipo_mesa);
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
            JSONObject tipo_mesa = obj.getJSONObject("data");
            tipo_mesa.put("key",key);
            tipo_mesa.put("key_usuario",obj.getString("key_usuario"));
            tipo_mesa.put("fecha_on","now()");
            tipo_mesa.put("estado",1);
            Conexion.insertArray("tipo_mesa", new JSONArray().put(tipo_mesa));
            Conexion.historico(obj.getString("key_usuario"),key, "tipo_mesa_regitro", tipo_mesa);
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            tipo_mesa.put("fecha_on", formatter.format(new Date()));
            obj.put("data", tipo_mesa);
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
            JSONObject tipo_mesa = obj.getJSONObject("data");
            Conexion.editObject("tipo_mesa", tipo_mesa);
            Conexion.historico(obj.getString("key_usuario"),tipo_mesa.getString("key"), "tipo_mesa_editar", tipo_mesa);
            obj.put("data", tipo_mesa);
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
           
            String url = Config.getJSON().getJSONObject("files").getString("url")+"tipo_mesa/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "tipo_mesa_subirFoto", new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
