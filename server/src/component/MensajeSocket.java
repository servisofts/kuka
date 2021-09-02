package component;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import util.console;

public class MensajeSocket {

    public static HashMap<String, MensajeSocket> Mensajes = new HashMap<>();
    public static Thread hilo;

    public static void run() {
        if (hilo == null) {
            hilo = new Thread() {
                @Override
                public void run() {
                    while (true) {
                        try {

                            for (Map.Entry me : Mensajes.entrySet()) {
                                MensajeSocket ms= Mensajes.get(me.getKey());
                                if(ms.getEnvios().size()>1){
                                    console.log(console.ANSI_GREEN_BACKGROUND,"El mensaje no a sido respondido en 1 intentos. ");
                                    Mensajes.remove(me.getKey());
                                }
                                ms.getSession().send(ms.getMensaje(),ms);
                            }
                            sleep(2000);
                        } catch (Exception e) {
                            // TODO: handle exception
                        }
                    }
                }
            };
            // hilo.start();
        }
    }

    public static void onMensaje(JSONObject data, SSSessionAbstract session) {
        data.put("noSend", true);
        switch (data.getString("type")) {
            case "llegoMensaje":
                llegoMensaje(data, session);
                break;
        }
    }

    public static void llegoMensaje(JSONObject obj, SSSessionAbstract session) {
        String key = obj.getString("SSkey");
        Mensajes.remove(key);
    }

    private String mensaje;
    private String key;
    private ArrayList<Date> envios;
    private SSSessionAbstract session;

    public MensajeSocket(String mensaje, SSSessionAbstract session) {
        this.mensaje = mensaje;
        this.session = session;
        this.key = UUID.randomUUID().toString();
        this.envios = new ArrayList<>();
        envios.add(new Date());
        Mensajes.put(key, this);
        run();
    }

    public void setEnvio(){
        envios.add(new Date());
    }
    public ArrayList<Date> getEnvios() {
        return envios;
    }

    public SSSessionAbstract getSession() {
        return session;
    }

    public String getKey() {
        return key;
    }

    public String getMensaje() {
        return mensaje;
    }
}
