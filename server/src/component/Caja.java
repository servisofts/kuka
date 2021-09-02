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

public class Caja {

    public Caja(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "getActiva":
                getActiva(data, session);
                break;
            case "getByFecha":
                getByFecha(data, session);
                break;
            case "getActivas":
                getActivas(data, session);
                break;
            case "registro":
                registro(data, session);
            break;
            case "cierre":
                cierre(data, session);
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
            String consulta =  "select get_all('caja') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_getAll", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getActiva(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select caja_get_activa('"+obj.getString("key_usuario")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_get_activa", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByFecha(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_fecha('caja','key','"+obj.getString("fecha_inicio")+"','"+obj.getString("fecha_fin")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_get_by_fecha", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getActivas(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select caja_get_activas() as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_get_activas", data);

            obj.put("data", data);  
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getActiva(String key_usuario) {
        try {
            String consulta =  "select caja_get_activa('"+key_usuario+"') as json";
            return Conexion.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('caja','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "caja_getByKey", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKey(String key) {
        try {
            String consulta =  "select get_by_key('caja','"+key+"') as json";
            return Conexion.ejecutarConsultaObject(consulta);

        } catch (SQLException e) {
            e.printStackTrace();
            return new JSONObject();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject caja = obj.getJSONObject("data");
            caja.put("key",UUID.randomUUID().toString());
            caja.put("fecha_on",fecha_on);
            caja.put("estado",1);
            

            JSONObject monto_caja = Sucursal.getMontoCaja(caja.getString("key_sucursal"));
            if(monto_caja.has("monto")){
                if(monto_caja.getDouble("monto") != caja.getDouble("monto")){
                    obj.put("data", caja);
                    obj.put("estado", "error");
                    obj.put("error", "Montos de caja inconsistente, hable con su poroveedor de sistemas.");
                    SSServerAbstract.sendAllServer(obj.toString());
                    return;
                }    
                JSONObject caja_movimiento = new JSONObject();
                caja_movimiento.put("key", UUID.randomUUID().toString());
                caja_movimiento.put("key_caja", monto_caja.getString("key"));
                caja_movimiento.put("key_caja_tipo_movimiento", 5);
                caja_movimiento.put("key_tipo_pago", "1");
                caja_movimiento.put("descripcion", "Transferencia por apertura");
                caja_movimiento.put("monto", caja.getDouble("monto")*-1);
                caja_movimiento.put("data", new JSONObject().put("key_tipo_pago", caja_movimiento.getString("key_tipo_pago")));
                caja_movimiento.put("fecha_on", fecha_on);
                caja_movimiento.put("estado", 1);
                Conexion.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
            }

            Conexion.insertArray("caja", new JSONArray().put(caja));


            JSONObject caja_movimiento = new JSONObject();
            caja_movimiento.put("key", UUID.randomUUID().toString());
            caja_movimiento.put("key_caja", caja.getString("key"));
            caja_movimiento.put("key_tipo_pago", "1");
            caja_movimiento.put("key_caja_tipo_movimiento", 1);
            caja_movimiento.put("descripcion", "apertura");
            caja_movimiento.put("monto", caja.getDouble("monto"));
            caja_movimiento.put("data", new JSONObject().put("key_tipo_pago", caja_movimiento.getString("key_tipo_pago")));
            caja_movimiento.put("fecha_on", fecha_on);
            caja_movimiento.put("estado", 1);
            Conexion.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));

            Conexion.historico(obj.getString("key_usuario"), caja.getString("key"), "caja_registro", caja);
            obj.put("data", caja);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }


    public static JSONObject addTraspasoBanco(String key_caja, String key_usuario, String key_tipo_pago, double monto, String fecha_on, JSONObject data) throws SQLException{
        JSONObject caja_movimiento = new JSONObject();
        caja_movimiento.put("key", UUID.randomUUID().toString());
        caja_movimiento.put("key_caja", key_caja);
        caja_movimiento.put("key_caja_tipo_movimiento", 3);
        caja_movimiento.put("key_tipo_pago", key_tipo_pago);
        caja_movimiento.put("descripcion", "Traspaso a bancos");
        caja_movimiento.put("monto", monto);
        data.put("key_tipo_baco", key_tipo_pago);
        caja_movimiento.put("data", data);
        caja_movimiento.put("fecha_on", fecha_on);
        caja_movimiento.put("estado", 1);
        Conexion.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
        
        return caja_movimiento;
    }

    public static JSONObject addVentaServicio(String key_caja, String key_usuario, String key_tipo_pago, double monto, String fecha_on, JSONObject data) throws SQLException{
        JSONObject caja_movimiento = new JSONObject();
        caja_movimiento.put("key", UUID.randomUUID().toString());
        caja_movimiento.put("key_caja", key_caja);
        caja_movimiento.put("key_caja_tipo_movimiento", 3);
        caja_movimiento.put("key_tipo_pago", key_tipo_pago);
        caja_movimiento.put("descripcion", "Venta de servicio");
        caja_movimiento.put("monto", monto);
        caja_movimiento.put("data", data);
        caja_movimiento.put("fecha_on", fecha_on);
        caja_movimiento.put("estado", 1);
        Conexion.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
        
        return caja_movimiento;
    }

    public void cierre(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject caja = obj.getJSONObject("data");
            caja.put("key",caja.getString("key_caja"));
            caja.put("fecha_off", fecha_on);
            Conexion.editObject("caja", caja);

            caja = Caja.getByKey(caja.getString("key")).getJSONObject(caja.getString("key"));

            JSONObject totales_caja = CajaMovimiento.getTotales(caja.getString("key"));

            JSONObject cajaTipoPagoCuentaBanco = SucursalTipoPagoCuentaBanco.getByKeySucursal(caja.getString("key_sucursal"));
            
            JSONObject pago;
            double monto;
            JSONObject caja_movimiento;
            JSONObject data = new JSONObject();
            for (int i = 0; i < JSONObject.getNames(totales_caja).length; i++) {
                pago = totales_caja.getJSONObject(JSONObject.getNames(totales_caja)[i]);
                if(pago.getString("key").equals("1") || pago.getString("key").equals("4")){
                    monto = pago.getDouble("monto");
                    if(pago.getString("key").equals("1")){
                        monto = monto<200?monto:monto-200;
                    }

                    caja_movimiento = new JSONObject();
                    caja_movimiento.put("key", UUID.randomUUID().toString());
                    caja_movimiento.put("key_caja", caja.getString("key"));
                    caja_movimiento.put("key_tipo_pago", pago.getString("key"));
                    caja_movimiento.put("key_caja_tipo_movimiento", 2);
                    caja_movimiento.put("descripcion", "Transferencia por cierre");
                    caja_movimiento.put("monto", monto*-1);
                    data.put("key_cuenta_banco", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_cuenta_banco"));
                    data.put("key_tipo_pago", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_tipo_pago"));
                    caja_movimiento.put("data", data);
                    caja_movimiento.put("fecha_on", fecha_on);
                    caja_movimiento.put("estado", 1);
                    Conexion.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));

                    JSONObject cuentaBancoMovimiento = new JSONObject();
                    cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                    cuentaBancoMovimiento.put("descripcion", "Ingreso por cierre de caja");
                    cuentaBancoMovimiento.put("key_cuenta_banco", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_cuenta_banco"));
                    cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
                    cuentaBancoMovimiento.put("monto", monto);
                    cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", caja_movimiento.getString("key")));
                    cuentaBancoMovimiento.put("fecha_on", fecha_on);
                    cuentaBancoMovimiento.put("estado", 1);
                    Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));
        
                    JSONObject sendcuentaBancoMovimiento = new JSONObject();
                    sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
                    sendcuentaBancoMovimiento.put("type", "registro");
                    sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
                    sendcuentaBancoMovimiento.put("estado", "exito");
                    SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                    
                }
            }

            Conexion.historico(obj.getString("key_usuario"), caja.getString("key"), "caja_cierre", caja);
            obj.put("data", caja);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject caja = obj.getJSONObject("data");
            Conexion.editObject("caja", caja);
            Conexion.historico(obj.getString("key_usuario"), caja.getString("key"), "caja_editar", caja);
            obj.put("data", caja);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"caja/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "caja_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }
}