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
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class PaqueteServicio {

    public PaqueteServicio(JSONObject data, SSSessionAbstract session) {
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
        try {
            String consulta =  "select get_all('paquete_servicio','key_paquete','"+obj.getString("key_paquete")+"','key_servicio') as json";
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
            String consulta =  "select get_by_key('paquete_servicio','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_servicio_getByKey", data);

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
            JSONObject paquete_servicio = obj.getJSONObject("data");
            paquete_servicio.put("key",UUID.randomUUID().toString());
            paquete_servicio.put("fecha_on",fecha_on);
            paquete_servicio.put("estado",1);
            Conexion.insertArray("paquete_servicio", new JSONArray().put(paquete_servicio));
            Conexion.historico(obj.getString("key_usuario"), paquete_servicio.getString("key"), "paquete_servicio_registro", paquete_servicio);
            obj.put("data", paquete_servicio);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_servicio = obj.getJSONObject("data");
            Conexion.editObject("paquete_servicio", paquete_servicio);
            Conexion.historico(obj.getString("key_usuario"), paquete_servicio.getString("key"), "paquete_servicio_editar", paquete_servicio);
            obj.put("data", paquete_servicio);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"paquete_servicio/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_servicio_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}