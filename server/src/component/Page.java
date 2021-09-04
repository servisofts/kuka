package component;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Page {

    public Page(JSONObject data, SSSessionAbstract session) {
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
            case "anular":
                anular(data, session);
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
            String consulta =  "select page_get_all() as json";
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
            String consulta =  "select page_get_by_key('"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject page = obj.getJSONObject("data");
            page.put("key",UUID.randomUUID().toString());
            page.put("fecha_on","now()");
            page.put("estado","1");
            Conexion.insertArray("page", new JSONArray().put(page));
            obj.put("data", page);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject page = obj.getJSONObject("data");
            Conexion.editObject("page", page);
            obj.put("data", page);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void anular(JSONObject obj, SSSessionAbstract session) {
        try {
            Conexion.anular("page", obj.getString("key"));
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
        File f = new File(url+"page/");
        if(!f.exists()) f.mkdirs();
        obj.put("dir", f.getPath()+"/"+obj.getString("key"));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}