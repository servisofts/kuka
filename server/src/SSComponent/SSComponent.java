package SSComponent;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class SSComponent {
    
    public static void navigate(JSONObject obj, SSSessionAbstract session){
        
        switch (obj.getString("type")) {
            case "getAll": getAll(obj, session); break;
            case "getByKey": getByKey(obj, session); break;
            case "registro": registro(obj, session); break;
            case "editar": editar(obj, session); break;
            case "subirFoto": subirFoto(obj, session); break;
            default: defaultType(obj, session);
        }
        obj.remove("nombre_tabla");
    }

    public static void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            String consulta =  "select get_all('"+obj.getString("nombre_tabla")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), obj.getString("nombre_tabla")+"_getAll", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            String consulta =  "select get_by_key('"+obj.getString("nombre_tabla")+"','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), obj.getString("nombre_tabla")+"_getByKey", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
        } catch (SQLException e) { 
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key",UUID.randomUUID().toString());
            data.put("fecha_on",fecha_on);

            data.put("estado",1);

            createTable(obj);

            Conexion.insertArray(obj.getString("nombre_tabla"), new JSONArray().put(data));
            Conexion.historico(obj.getString("key_usuario"), data.getString("key"), obj.getString("nombre_tabla")+"_registro", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            JSONObject data = obj.getJSONObject("data");
            Conexion.editObject(obj.getString("nombre_tabla"), data);
            Conexion.historico(obj.getString("key_usuario"), data.getString("key"), obj.getString("nombre_tabla")+"_editar", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void subirFoto(JSONObject obj, SSSessionAbstract session) {
        capitalTransform(obj);
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+obj.getString("nombre_tabla")+"/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), obj.getString("nombre_tabla")+"_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        obj.remove("nombre_tabla");
        SSServerAbstract.sendAllServer(obj.toString());
    }

    public static void capitalTransform(JSONObject obj){
        Matcher m = Pattern.compile("[/A-Z]").matcher(obj.getString("component"));
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, "_"+m.group().toLowerCase());
        }
        m.appendTail(sb);
        obj.put("nombre_tabla", sb.toString());
    }

    private static void createTable(JSONObject obj){
        if(!Config.getJSON().getBoolean("production")){
            if(obj.getBoolean("force")){
                Conexion.createTable(obj.getString("nombre_tabla"), obj.getJSONObject("data"));
            }
            obj.put("nombre_tabla", "");
        }
    }

    public static void main(String[] args) {
        SSComponent.capitalTransform(new JSONObject().put("component", "mensajeSocket"));
    }
}