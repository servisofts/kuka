package component;

import java.io.File;
import java.sql.SQLException;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class CajaTipoMovimiento {

    public CajaTipoMovimiento(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
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
            String consulta =  "select get_all('caja_tipo_movimiento') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_tipo_movimiento_getAll", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('caja_tipo_movimiento','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_tipo_movimiento_getByKey", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject caja_tipo_movimiento = obj.getJSONObject("data");
            Conexion.editObject("caja_tipo_movimiento", caja_tipo_movimiento);
            Conexion.historico(obj.getString("key_usuario"), caja_tipo_movimiento.getString("key"), "caja_tipo_movimiento_editar", caja_tipo_movimiento);
            obj.put("data", caja_tipo_movimiento);
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
        File f = new File(url+"caja_tipo_movimiento/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "caja_tipo_movimiento_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}