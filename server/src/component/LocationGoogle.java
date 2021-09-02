package component;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;

import org.json.JSONObject;

public class LocationGoogle {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public LocationGoogle(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            default:
                defaultType(data, session);
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        SocketCliete.send("geolocation", obj, session);
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        SocketCliete.send("geolocation", obj, session);
    }
}