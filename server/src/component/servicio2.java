package component;

import java.io.ByteArrayInputStream;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import Config.Config;
import SSL.SSL;
import Server.ServerSocket.ServerSocket;
import Server.ServerSocketWeb.ServerSocketWeb;
import ServerHttp.ServerHttp;
import SocketCliente.SocketCliete;

import util.Regex;

import org.bouncycastle.util.encoders.Base64;
import org.json.JSONArray;
import org.json.JSONObject;

public class servicio2 {

    public servicio2(JSONObject obj) {
        if (!obj.isNull("type")) {
            switch (obj.getString("type")) {
                case "init":
                    init(obj);
                    break;
                case "initServer":
                    initServer(obj);
                    break;
                case "getServicioHabilitado":
                    getServicioHabilitado(obj);
                    break;
                case "getPem":
                    getPem(obj);
                    break;
            }
        }
    }

    private void getServicioHabilitado(JSONObject obj) {
        JSONArray data = obj.getJSONArray("data");
        System.out.println("SERVICIO HABILITADOS");
        JSONObject serviciosH = new JSONObject();
        for (int i = 0; i < data.length(); i++) {
            JSONObject serhabilitado = data.getJSONObject(i);
            serviciosH.put(serhabilitado.getJSONObject("servicio").getString("nombre"),
                    serhabilitado.getJSONObject("servicio"));
            System.out.println(serhabilitado.getJSONObject("servicio").getString("nombre") + " - "
                    + serhabilitado.getJSONObject("servicio").getString("ip") + ":"
                    + serhabilitado.getJSONObject("servicio").getInt("puerto"));
        }
        SocketCliete.servicios_habilitados = serviciosH;
        SocketCliete.StartServicio("usuario");
        SocketCliete.StartServicio("roles_permisos");
        SocketCliete.StartServicio("geolocation");
    }

    private void initServer(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {

            // Config.setSocketCliente(obj);
            new ServerSocket(obj.getJSONObject("data").getInt("puerto"));
            new ServerSocketWeb(obj.getJSONObject("data").getInt("puerto_ws"));
            ServerHttp.Start(obj.getJSONObject("data").getInt("puerto_http"));
            // GlupApplication.openSpring();

            JSONObject objSend = new JSONObject();
            objSend.put("component", "servicio");
            objSend.put("type", "getServicioHabilitado");
            objSend.put("key", obj.getJSONObject("data").getString("key"));
            objSend.put("estado", "cargando");
            SocketCliete.send("servicio", objSend.toString());
        } else {
            System.out.println(obj.getString("error"));
        }
    }

    private void init(JSONObject obj) {
        JSONObject data = new JSONObject();
        data.put("cert", Config.getJSON("ssl").getJSONObject("cert"));
        data.put("ip", Config.getJSON("socket_server").getString("ip"));
        // SSL.getCert(nombre)
        // String pem =
        // SSL.getPemNoHeader(SSL.getCert(Config.getJSON("ssl").getJSONObject("cert").getString("OU")));
        String fingerp = SSL.getFingerPrint(Config.getJSON("ssl").getJSONObject("cert").getString("OU"));
        // data.put("pem", pem);
        data.put("fingerp", fingerp);
        JSONObject objSend = new JSONObject();
        objSend.put("component", "servicio");
        objSend.put("type", "initServer");
        objSend.put("data", data);
        objSend.put("estado", "cargando");
        SocketCliete.send("servicio", objSend.toString());
    }

    private void getPem(JSONObject obj) {
        // System.out.println(obj.toString());

        try {
            String pem = obj.getString("data");
            byte[] prvBlob = Base64.decode(pem);
            X509Certificate cert = (X509Certificate) CertificateFactory.getInstance("X.509")
                    .generateCertificate(new ByteArrayInputStream(prvBlob));
            String nombre = Regex.findOU(cert.getSubjectX500Principal().getName());
            SSL.registerPem(nombre, cert);
            SocketCliete.servicios_habilitados.getJSONObject(nombre).put("pem", nombre + ".pem");
        } catch (CertificateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
