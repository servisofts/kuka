package SocketCliente;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

import component.ManejadorServicio;
import util.console;
import Config.Config;
import SSL.SSL;
import Server.SSSAbstract.SSSessionAbstract;

import org.json.JSONObject;

public class SocketCliete extends Thread {

    public static HashMap<String, SocketCliete> Clientes = new HashMap<>();
    private static HashMap<String, JSONObject> ConexinesFallidas = new HashMap<>();

    public static JSONObject servicios_habilitados = new JSONObject();
    // Metodos Staticos globalizados

    public static void StartServicio(String nombre) {
        if (!servicios_habilitados.has(nombre)) {
            console.log(console.ANSI_RED,"No existe el servicio");
            return;
        }

        JSONObject servicio = servicios_habilitados.getJSONObject(nombre);
        if (!servicio.has("pem")) {
            console.log(console.ANSI_RED,"No existe el pem.");
            JSONObject objSend = new JSONObject();
            objSend.put("component", "servicio");
            objSend.put("type", "getPem");
            objSend.put("estado", "cargando");
            objSend.put("key_servicio", servicio.getString("key"));
            Clientes.get("servicio").send(objSend.toString());
            console.log(console.ANSI_RED,"Pidiendo SHA a servicios.");
            // return;
        }
        JSONObject config = new JSONObject();
        config.put("ip", servicio.getString("ip"));
        config.put("puerto", servicio.getInt("puerto"));
        JSONObject cert = new JSONObject();
        cert.put("OU", servicio.getString("nombre"));
        config.put("cert", cert);
        Start(config);
    }

    public static void Start(JSONObject config) {
       console.log(console.ANSI_YELLOW,"**Conectando con 'servisofts." + config.getJSONObject("cert").getString("OU")
                + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");

        // CONFIGURAMNO EL CLIENTE SOCKET Y CORREMOS EL HILO
        try {
            SSLContext ss = SSL.getSSLContext();
            SSLSocketFactory ssf = ss.getSocketFactory();
            SSLSocket s;
            s = (SSLSocket) ssf.createSocket(config.getString("ip"), config.getInt("puerto"));
            s.startHandshake();
            // INICIA LA CONEXION AL SOCKET new SocketCliete(config);
            new SocketCliete(config, s);

        } catch (Exception e) {
            ConexinesFallidas.put(config.getJSONObject("cert").getString("OU"), config);
            console.log(console.ANSI_RED,e.getMessage());
            console.log(console.ANSI_RED,
                    "Error al conectar con el servidor 'servisofts." + config.getJSONObject("cert").getString("OU")
                            + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
        }

    }

    private static Thread TReconnect;

    public static void enableReconect(boolean enable) {
        if (!enable) {
            if (TReconnect != null) {
                TReconnect = null;
            }
        } else {
            TReconnect = new Thread() {
                @Override
                public void run() {
                    while (TReconnect != null) {
                        try {
                            Collection<JSONObject> values = ConexinesFallidas.values();
                            ArrayList<JSONObject> listOfValues = new ArrayList<JSONObject>(values);
                            for (int i = 0; i < listOfValues.size(); i++) {
                                Start(ConexinesFallidas.get(listOfValues.get(i).getJSONObject("cert").getString("OU")));
                            }
                            
                            // Sleep metodh
                            Thread.sleep(Config.getJSON().getJSONObject("socket_client").getInt("reconectTime"));
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            };
            TReconnect.start();
        }
    }

    // Cliente Socket
    private boolean Open = false;
    private PrintWriter response;
    private BufferedReader request;
    public JSONObject config;

    public SocketCliete(JSONObject config, SSLSocket socket) throws IOException {
        response = new PrintWriter(socket.getOutputStream(), true);
        request = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.config = config;
        console.log(console.ANSI_YELLOW,"** Connectando con el server " + config.getJSONObject("cert").getString("OU") + " **");
        // System.out.println("SocketCliete is Running...");
        Clientes.put(config.getJSONObject("cert").getString("OU"), this);
        ConexinesFallidas.remove(config.getJSONObject("cert").getString("OU"));
        this.start();
        this.Open = true;
    }

    @Override
    public void run() {
        try {
            String eventos;
            while (Open) {
                eventos = request.readLine();
                // System.out.println(eventos);
                onMesagge(eventos, config);
            }
        } catch (Exception ex) {
            onError(ex);
            ConexinesFallidas.put(config.getJSONObject("cert").getString("OU"), config);
            this.Open = false;
        }
    }

    private void onError(Exception ex) {
        console.log(console.ANSI_RED,"Error:" + ex.getLocalizedMessage());
    }

    private void onMesagge(String msg, JSONObject config) {
        try {
            JSONObject data = new JSONObject(msg);
            switch (config.getJSONObject("cert").getString("OU")) {
                case "servicio":
                    ManejadorServicio.onMessage(data);
                    break;
                default:
                    ManejadorCliente.onMessage(data);
            }

        } catch (Exception e) {
            if (e.getMessage() != null) {
                console.log(console.ANSI_RED,"ERROR: SocketCliente: OnMensaje: " + e.getMessage());
            } else {
                this.Open = false;
                console.log(console.ANSI_RED,"Session cliente close");
                SocketCliete.ConexinesFallidas.put(config.getJSONObject("cert").getString("OU"), config);
            }

        }
    }

    public void send(String data) {
        // SocketCliete.StartServicio("usuario");
        console.log(console.ANSI_RED,"----->Send -> "+config.getJSONObject("cert").getString("OU") +" ------------START-------------- \n"+ data.toString() +"\n-------------------------------------END------------");
        response.println(data);
        response.flush();
    }

    public static void send(String server, String data) {

        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();
    }

    public static void send(String server, JSONObject data, SSSessionAbstract session) {
        if(session!=null)
            data.put("router", session.getIdSession());
            
        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();

    }

}