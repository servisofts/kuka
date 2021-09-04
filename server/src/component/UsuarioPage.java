package component;

import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class UsuarioPage {

    public UsuarioPage(JSONObject data, SSSessionAbstract session) {
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
            case "anular":
                anular(data, session);
            break;
            case "editar":
                editar(data, session);
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
            String consulta =  "select usuario_page_get_all('"+obj.getString("key_usuario")+"') as json";
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
            String consulta =  "select usuario_page_get_by_key('"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject usuario_page = obj.getJSONObject("data");
            usuario_page.put("key",UUID.randomUUID().toString());
            usuario_page.put("fecha_on","now()");
            usuario_page.put("estado",1);
            Conexion.insertArray("usuario_page", new JSONArray().put(usuario_page));
            obj.put("data", usuario_page);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }
    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject proceso = obj.getJSONObject("data");
            proceso.put("key",obj.getString("key_rol"));
            Conexion.editObject("proceso", proceso);
            obj.put("data", proceso);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void anular(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject usuario_page = new JSONObject();
            usuario_page.put("key",obj.getJSONObject("data").getString("key"));
            usuario_page.put("fecha_off","now()");
            usuario_page.put("estado",0);
            Conexion.editObject("usuario_page", usuario_page);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    

}