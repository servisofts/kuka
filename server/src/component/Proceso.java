package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class Proceso {
    public Proceso(JSONObject data, SSSessionAbstract session) {
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
            String consulta =  "select proceso_get_all('"+obj.getString("key_modulo")+"') as json";
            JSONObject proceso = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key_modulo"), "proceso_getAll", new JSONObject());
            obj.put("data", proceso);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getString("key");
            String consulta =  "select proceso_get_by_key('"+key+"') as json";
            JSONObject proceso = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), key, "proceso_getByKey", new JSONObject().put("key", key));
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
            Calendar cal = new GregorianCalendar();
            cal.add(Calendar.DAY_OF_MONTH, 7);
            String fecha_expiracion = formatter.format(cal.getTime());
            String key = UUID.randomUUID().toString();
            JSONObject proceso = obj.getJSONObject("data");
            proceso.put("key",key);
            proceso.put("fecha_on",fecha_on);
            proceso.put("estado",1);
            Conexion.insertArray("proceso", new JSONArray().put(proceso));
            Conexion.historico(obj.getString("key_usuario"),key, "proceso_regitro", proceso);
            
            JSONObject proceso_seguimiento = new JSONObject();
            proceso_seguimiento.put("key",UUID.randomUUID().toString());
            proceso_seguimiento.put("key_proceso",key);
            proceso_seguimiento.put("descripcion","Apertura de proceso");
            proceso_seguimiento.put("key_usuario",obj.getString("key_usuario"));
            proceso_seguimiento.put("key_tipo_seguimiento","1");
            proceso_seguimiento.put("fecha_on",fecha_on);
            proceso_seguimiento.put("fecha_expiracion", fecha_expiracion);
            proceso_seguimiento.put("estado",1);
            proceso_seguimiento.put("precio",0);
            Conexion.insertArray("proceso_seguimiento", new JSONArray().put(proceso_seguimiento));
            
            obj.put("data", proceso);
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
            JSONObject proceso = obj.getJSONObject("data");
            Conexion.editObject("proceso", proceso);
            Conexion.historico(obj.getString("key_usuario"),proceso.getString("key"), "proceso_editar", proceso);
            obj.put("data", proceso);
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
           
            String url = Config.getJSON().getJSONObject("files").getString("url")+"proceso/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "proceso_subirFoto", new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
