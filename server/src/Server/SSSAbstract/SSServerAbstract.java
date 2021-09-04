package Server.SSSAbstract;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import FireBase.FireBase;
import FireBase.FireBaseTokens;
import Server.SSSInterface.SSServerInterface;
import util.console;

public abstract class SSServerAbstract implements SSServerInterface {

    public static final String TIPO_SOCKET_WEB = "ServerSocketWeb";
    public static final String TIPO_SOCKET = "ServerSocket";

    private static HashMap<String, SSServerAbstract> SERVIDORES = new HashMap<>();
    private static HashMap<String, ArrayList<String>> USUARIOS = new HashMap<>();
    public static HashMap<String, String> DEVICES = new HashMap<>();

    public static void setUserSession(String keyUser, String keyDevice) {
        ArrayList<String> usuarios = USUARIOS.get(keyUser);
        if (usuarios == null) {
            usuarios = new ArrayList<>();
        }
        boolean exist = false;
        for (String string : usuarios) {
            if (string.equals(keyDevice)) {
                exist = true;
            }
        }
        if (!exist) {
            usuarios.add(keyDevice);
        }
        USUARIOS.put(keyUser, usuarios);
    }

    public static void setDeviceSession(String keyDevice, String KeySession) {
        DEVICES.put(keyDevice, KeySession);
    }

    public static void closeSession(String key_session) {
        try {
            for (Map.Entry me : SERVIDORES.entrySet()) {
                SSServerAbstract server = SERVIDORES.get(me.getKey());
                if (server.getSessiones().get(key_session) != null) {
                    SSSessionAbstract sesion = server.getSessiones().get(key_session);
                    server.sessiones.remove(key_session);
                    DEVICES.remove(sesion.getKeyDevice());
                    ArrayList<String> devicesUser = USUARIOS.get(sesion.getKeyUsuario());
                    if (devicesUser != null) {
                        for (String keyDevice : devicesUser) {
                            if (keyDevice.equals(sesion.getKeyDevice())) {
                                devicesUser.remove(keyDevice);
                            }
                        }
                    }

                    SSServerAbstract.verSessiones();
                }
            }
        } catch (Exception e) {
            console.log(console.ANSI_RED, "--> ERROR: "+e.getMessage());
        }

    }

    public static SSServerAbstract getServer(String tipo) {
        SSServerAbstract servidor = SERVIDORES.get(tipo);
        if (servidor == null) {
            return null;
        }
        return servidor;
    }

    public static SSSessionAbstract getSession(String key_session) {
        for (Map.Entry me : SERVIDORES.entrySet()) {
            SSServerAbstract server = SERVIDORES.get(me.getKey());
            if (server.getSessiones().get(key_session) != null) {
                return server.getSessiones().get(key_session);
            }
        }
        return null;
    }
    public static void sendUserFirebase(String mensaje, String key_usr) {
        Thread t = new Thread() {
            @Override
            public void run() {
                String tokenNotificado  =  "";
                if (FireBaseTokens.usuarios.has(key_usr)) {
                    JSONObject objToken = FireBaseTokens.usuarios.getJSONObject(key_usr);
                    JSONObject data = new JSONObject();
                    data.put("body", mensaje);
                    FireBase.send(objToken.getString("token"), objToken.getString("app"), data);
                }
            }
        };
        t.start();
    }
    

    public static void sendUsers(String mensaje, JSONArray key_usrs) {
        Thread t = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < key_usrs.length(); i++) {
                    ArrayList<String> devices = USUARIOS.get(key_usrs.getString(i));
                    if (devices == null) {
                        continue;
                    }
                    for (String idDevice : devices) {
                        String idSession = DEVICES.get(idDevice);
                        for (Map.Entry me : SERVIDORES.entrySet()) {
                            SSServerAbstract server = SERVIDORES.get(me.getKey());
                            if (server.getSessiones().get(idSession) != null) {
                                server.getSessiones().get(idSession).send(mensaje);
                            }
                        }

                    }
                }
            }
        };
        t.start();
    }

    public static void sendServer(String tipo, String mensaje) {
        SSServerAbstract servidor = SERVIDORES.get(tipo);
        if (servidor != null) {
            servidor.sendAll(mensaje);
        }

    }

    public static void sendAllServer(String mensaje) {
        System.out.println("----------REPORTE DE SESSIONES--------");
        for (Map.Entry me : SERVIDORES.entrySet()) {
            SSServerAbstract server = SERVIDORES.get(me.getKey());
            server.sendAll(mensaje);
        }
    }

    public static void verSessiones() {
        System.out.println("----------REPORTE DE SESSIONES--------");
        for (Map.Entry me : SERVIDORES.entrySet()) {
            SSServerAbstract server = SERVIDORES.get(me.getKey());
            System.out.println("--------" + server.getTipoServer() + "------");
            for (Map.Entry me2 : server.getSessiones().entrySet()) {
                SSSessionAbstract session = server.getSessiones().get(me2.getKey());
                System.out.println("------" + session.getIdSession() + "---- keyDevice: " + session.getKeyDevice()
                        + " -------KeyUser: " + session.getKeyUsuario());
            }
        }
    }

    ///// CLASE
    private int puerto;
    private String tipoServer;
    private HashMap<String, SSSessionAbstract> sessiones;

    public SSServerAbstract(int puerto, String tipoServer) {
        this.puerto = puerto;
        this.tipoServer = tipoServer;
        this.sessiones = new HashMap<>();
        printLog("Server " + tipoServer + " creado en el puerto: " + puerto);
        SERVIDORES.put(tipoServer, this);
        this.Start(puerto);
    }

    public int getPuerto() {
        return puerto;
    }

    public String getTipoServer() {
        return tipoServer;
    }

    public HashMap<String, SSSessionAbstract> getSessiones() {
        return sessiones;
    }

    public void setSession(SSSessionAbstract session) {
        this.sessiones.put(session.getIdSession(), session);
        SSServerAbstract.verSessiones();
    }

    public void sendAll(String mensaje) {
        System.out.println("----------REPORTE DE SESSIONES--------");
        for (Map.Entry me2 : sessiones.entrySet()) {
            SSSessionAbstract session = sessiones.get(me2.getKey());
            session.send(mensaje);
        }
    }
}
