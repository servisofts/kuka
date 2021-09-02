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

public class SucursalTipoPagoCuentaBanco {

    public SucursalTipoPagoCuentaBanco(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKeySucursal":
                getByKeySucursal(data, session);
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
            String consulta =  "select get_all('sucursal_tipo_pago_cuenta_banco','sucursal_tipo_pago_cuenta_banco') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKeySucursal(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select sucursal_tipo_pago_cuenta_banco_get_by_key('"+obj.getString("key_sucursal")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKeySucursal(String keySucursal) {
        try {
            String consulta =  "select sucursal_tipo_pago_cuenta_banco_get_by_key('"+keySucursal+"') as json";
            return  Conexion.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return new JSONObject();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject sucursal_tipo_pago_cuenta_banco = obj.getJSONObject("data");
            sucursal_tipo_pago_cuenta_banco.put("key",UUID.randomUUID().toString());
            sucursal_tipo_pago_cuenta_banco.put("fecha_on",fecha_on);
            sucursal_tipo_pago_cuenta_banco.put("estado",1);
            Conexion.insertArray("sucursal_tipo_pago_cuenta_banco", new JSONArray().put(sucursal_tipo_pago_cuenta_banco));
            obj.put("data", sucursal_tipo_pago_cuenta_banco);
            obj.put("estado", "exito");
            Conexion.historico(obj.getString("key_usuario"), "sucursal_tipo_pago_cuenta_banco_registro", sucursal_tipo_pago_cuenta_banco);
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject sucursal_tipo_pago_cuenta_banco = obj.getJSONObject("data");
            Conexion.editObject("sucursal_tipo_pago_cuenta_banco", sucursal_tipo_pago_cuenta_banco);
            obj.put("data", sucursal_tipo_pago_cuenta_banco);
            obj.put("estado", "exito");
            Conexion.historico(obj.getString("key_usuario"), "sucursal_tipo_pago_cuenta_banco_editar", sucursal_tipo_pago_cuenta_banco);
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"sucursal_tipo_pago_cuenta_banco/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}