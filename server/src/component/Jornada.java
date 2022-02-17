package component;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import com.mysql.cj.protocol.Resultset;
import com.mysql.cj.x.protobuf.MysqlxPrepare.Prepare;

import org.json.JSONArray;
import org.json.JSONObject;
import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;
import util.Fecha;

public class Jornada {
    public Jornada(JSONObject data, SSSessionAbstract session) {
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
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select jornada_get_all() as json";
            JSONObject jornada = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", jornada);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getJSONObject("data").getString("key");
            String consulta = "select jornada_get_by_key('" + key + "') as json";
            JSONObject jornada = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), key, "jornada_getByKey", new JSONObject().put("key", key));
            obj.put("data", jornada);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject jornada = obj.getJSONObject("data");
            jornada.put("key", UUID.randomUUID().toString());
            jornada.put("fecha_on", Fecha.now());
            jornada.put("estado", 1);
            Conexion.insertObject("jornada", jornada);
            Conexion.historico(obj.getString("key_usuario"), jornada.getString("key"), "jornada_registro", jornada);
            obj.put("data", jornada);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject jornada = obj.getJSONObject("data");
            Conexion.editObject("jornada", jornada);
            Conexion.historico(obj.getString("key_usuario"), jornada.getString("key"), "jornada_editar", jornada);
            obj.put("data", jornada);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        try {

            String url = Config.getJSON().getJSONObject("files").getString("url") + "jornada/";
            File f = new File(url);
            if (!f.exists())
                f.mkdirs();
            JSONArray documentos = new JSONArray();
            url += obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "jornada_subirFoto",
                    new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
