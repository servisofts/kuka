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

public class Paquete {

    public Paquete(JSONObject data, SSSessionAbstract session) {
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
            String consulta =  "select get_all_mas_anulados('paquete') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_getAll", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('paquete','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_getByKey", data);

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
            JSONObject paquete = obj.getJSONObject("data");
            paquete.put("key",UUID.randomUUID().toString());
            paquete.put("fecha_on",fecha_on);
            paquete.put("estado","1");
            Conexion.insertArray("paquete", new JSONArray().put(paquete));

            JSONArray paquete_servicios = new JSONArray();
            JSONObject paquete_servicio;
            for (int i = 0; i < obj.getJSONArray("servicios").length(); i++) {
                paquete_servicio = new JSONObject();
                paquete_servicio.put("key", UUID.randomUUID().toString());
                paquete_servicio.put("key_paquete", paquete.getString("key"));
                paquete_servicio.put("key_servicio", obj.getJSONArray("servicios").getString(i));
                paquete_servicio.put("estado", 1);
                paquete_servicios.put(paquete_servicio);
            }
            Conexion.insertArray("paquete_servicio", paquete_servicios);

            Conexion.historico(obj.getString("key_usuario"), paquete.getString("key"), "paquete_registro", paquete);
            obj.put("data", paquete);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete = obj.getJSONObject("data");
            Conexion.editObject("paquete", paquete);
            Conexion.historico(obj.getString("key_usuario"), paquete.getString("key"), "paquete_editar", paquete);
            obj.put("data", paquete);
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
        File f = new File(url+"paquete/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}