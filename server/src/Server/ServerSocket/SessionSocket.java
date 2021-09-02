package Server.ServerSocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.security.cert.X509Certificate;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HandshakeCompletedEvent;
import javax.net.ssl.HandshakeCompletedListener;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import component.Manejador;
import component.MensajeSocket;
import util.console;

public class SessionSocket extends SSSessionAbstract {

    private javax.net.ssl.SSLSocket miSession;
    private PrintWriter outpw = null;
    private X509Certificate cer;
    private JSONObject servicio = null;

    public SessionSocket(Object session, ServerSocket server) {
        super(session, ((javax.net.ssl.SSLSocket) session).getRemoteSocketAddress().toString(), server);
        this.miSession = (javax.net.ssl.SSLSocket) session;
        this.miSession.addHandshakeCompletedListener(new HandshakeCompletedListener() {
            @Override
            public void handshakeCompleted(HandshakeCompletedEvent event) {
                X509Certificate cerx = (X509Certificate) event.getLocalCertificates()[0];
                cer = cerx;
                printLog("Certificado: " + cer.getSubjectX500Principal().getName());
            }
        });
        try {
            outpw = new PrintWriter(miSession.getOutputStream(), true);
            Start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessage(String mensaje) {
        JSONObject data = new JSONObject(mensaje);
        data.put("id", getIdSession());
        data.put("noSend", false);
        if (servicio != null) {
            data.put("servicio", servicio);
        }
        new Manejador(data, this);
        if (!data.getBoolean("noSend")) {
            if (data.has("servicio")) {
                data.remove("servicio");
            }
            send(data.toString());
        }
    }

    @Override
    public void onClose(JSONObject obj) {
        try {
            miSession.close();
            super.onClose(obj);
            printLog("Conexion cerrada: ip = " + getIdSession() + " )");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onError(JSONObject obj) {
        printLog("Error: " + obj.getString("error"));

    }

    @Override
    public void send(String mensaje) {
        MensajeSocket mensajeSocket = new MensajeSocket(mensaje, this);
        outpw.write(mensaje + "---SSkey---" + mensajeSocket.getKey() + "---SSofts---");
        outpw.flush();
    }

    @Override
    public void send(String mensaje, MensajeSocket mensajeSocket) {
        mensajeSocket.setEnvio();
        outpw.write(mensaje + "---SSkey---" + mensajeSocket.getKey() + "---SSofts---");
        outpw.flush();
    }

    public void Start() {
        try {
            Thread t = new Thread() {
                @Override
                public void run() {
                    try {
                        printLog("Nueva session desde " + getIdSession());
                        InputStream inp = null;
                        BufferedReader brinp = null;
                        inp = miSession.getInputStream();
                        brinp = new BufferedReader(new InputStreamReader(inp));
                        onOpen();
                        String line;
                        boolean isRun = true;
                        while (isRun) {
                            try {
                                line = brinp.readLine();
                                if ((line == null) || line.equalsIgnoreCase("QUIT")) {
                                    JSONObject obj = new JSONObject();
                                    obj.put("estado", "close");
                                    onClose(obj);
                                    return;
                                } else {
                                    if (line.length() > 0) {
                                        onMessage(line);
                                    }
                                }
                            } catch (Exception e) {
                                Pattern p = Pattern.compile(".*?onnection.has.closed.*");
                                if (e.getMessage() != null) {
                                    Matcher m = p.matcher(e.getMessage());
                                    boolean b = m.matches();
                                    if (b) {
                                        isRun = false;
                                    }
                                    JSONObject obj = new JSONObject();
                                    obj.put("estado", "error");
                                    obj.put("error", e.getLocalizedMessage());
                                    onError(obj);
                                } else {
                                    isRun = false;
                                }
                            }
                        }
                    } catch (Exception e) {
                        JSONObject obj = new JSONObject();
                        obj.put("estado", "error");
                        obj.put("error", e.getLocalizedMessage());
                        onError(obj);
                    }
                }
            };
            t.start();
        } catch (Exception e) {
            JSONObject obj = new JSONObject();
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            onError(obj);
        }
    }

    @Override
    public void printLog(String mensaje) {
        console.log(console.ANSI_BLUE, getIdSession() + ": " + mensaje);

    }

}
