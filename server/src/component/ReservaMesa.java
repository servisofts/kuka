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

public class ReservaMesa {
    public ReservaMesa(JSONObject data, SSSessionAbstract session) {
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
            case "ingreso":
                ingreso(data, session);
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
            String consulta = "select reserva_mesa_get_all() as json";
            JSONObject mesa = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", mesa);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getString("key");
            String consulta = "select RESERVA_MESA_GET_BY_KEY('" + key + "') as json";
            JSONObject mesa = Conexion.ejecutarConsultaObject(consulta);
            // Conexion.historico(obj.getString("key_usuario"), key,
            // "reserva_mesa_getByKey", new JSONObject().put("key", key));
            obj.put("data", mesa);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            data.put("key", UUID.randomUUID().toString());
            data.put("cantidad_clientes", 0);
            data.put("keu_usuario_relacionador", obj.getString("key_usuario"));
            data.put("fecha_on", "now()");
            data.put("estado", 1);
            Conexion.insertArray("reserva_mesa", new JSONArray().put(data));
            data.put("ingreso", 0);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void ingreso(JSONObject obj, SSSessionAbstract session) {
        try {
            // key_usuario, cantidad, key_reserva_mesa
            JSONObject data = obj.getJSONObject("data");
            data.put("key", UUID.randomUUID().toString());
            data.put("fecha_on", Fecha.now());
            data.put("estado", 1);
            Conexion.insertObject("reserva_mesa_ingreso", data);
            String consulta = "select RESERVA_MESA_GET_BY_KEY('" + data.getString("key_reserva_mesa") + "') as json";
            JSONObject mesa = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", mesa);
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
            JSONObject reserva_mesa = obj.getJSONObject("data");
            Conexion.editObject("reserva_mesa", reserva_mesa);
            Conexion.historico(obj.getString("key_usuario"), reserva_mesa.getString("key"), "reserva_mesa_editar",
                    reserva_mesa);
            obj.put("data", reserva_mesa);
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

            String url = Config.getJSON().getJSONObject("files").getString("url") + "mesa/";
            File f = new File(url);
            if (!f.exists())
                f.mkdirs();
            JSONArray documentos = new JSONArray();
            url += obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "mesa_subirFoto",
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
