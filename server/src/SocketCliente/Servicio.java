package SocketCliente;

import java.io.IOException;
import java.security.cert.CertificateEncodingException;

import Config.Config;
import SSL.SSL;
import util.*;

import org.json.JSONException;
import org.json.JSONObject;

public class Servicio {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public static void servicio(JSONObject action) {
        switch (action.getString("type")) {
            case "init":
                init(action);
                break;
            case "initClient":
                initClient(action);
                break;
            default:
            console.log(console.ANSI_RED,"type Not Found");
        }

    }

    public static void init(JSONObject action) {
        try {
            console.log(console.ANSI_RED,"Init client");
            JSONObject objSend = new JSONObject();
            objSend.put("component", "servicio");
            objSend.put("type", "initClient");
            objSend.put("estado", "cargando");
            JSONObject objData = new JSONObject();
            JSONObject cert = new JSONObject();
            cert.put("OU", Config.getJSON().getString("nombre"));
            // objData.put("ip", "servicio");
            objData.put("cert", cert);
            objData.put("fingerp", SSL.fingerprint(SSL.getCert(Config.getJSON().getString("nombre"))));
            objSend.put("data", objData);
            SocketCliete.Clientes.get(action.getString("socket")).send(objSend.toString());
        } catch (CertificateEncodingException | JSONException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static void initClient(JSONObject action) {
        
        console.log(console.ANSI_RED, "Indentificado como: "+action.getString("id")+ " - "+action.getJSONObject("data").getString("OU"));
    }
}