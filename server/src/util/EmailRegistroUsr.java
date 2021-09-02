package util;

import java.io.FileReader;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class EmailRegistroUsr extends Thread {

    /*
     * asunto para pass
     */
    private JSONObject data;

    public EmailRegistroUsr(JSONObject data) {
        this.data = data;
    }
	public static void main(String[] args) {
        JSONObject obj = new JSONObject();
        obj.put("correo", "ricky.paz.d.97@gmail.com");
        obj.put("pass", "ABDBSC");
        new EmailRegistroUsr(obj).start();
    }
    @Override
    public void run() {
        try {
            Properties props = new Properties();
            // Nombre del host de correo, es smtp.gmail.com
            props.setProperty("mail.smtp.host", "smtp.gmail.com");
            // TLS si está disponible
            // props.setProperty("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.ssl.enable", "true");
            // Puerto de gmail para envio de correos
            props.setProperty("mail.smtp.port", "465");
            // Nombre del usuario
            props.setProperty("mail.smtp.user", "servisofts.srl@gmail.com");
            // Si requiere o no usuario y password para conectarse.
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            // session.setDebug(true);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("servisofts.srl@gmail.com"));
            // message.addRecipient(Message.RecipientType.TO, new
            // InternetAddress(data.getString("E")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(data.getString("correo")));
            message.setSubject("Registro de usuario.");
            message.setContent(getHtml(data), "text/html");
            Transport t = session.getTransport("smtp");
            t.connect("servisofts.srl@gmail.com", "servisofts123.");
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("Correo enviado a "+data.getString("correo"));
        } catch (Exception ex) {
            // Logger.getLogger(Email.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    private static String getHtml(JSONObject data) throws JSONException {
        String cuerpo = "";
            try {
                    FileReader file;
                    file = new FileReader("emails/RegistroUsuario.html");
                    int valor = file.read();
                    String configJson = "";
                    while (valor != -1) {
                        configJson = String.valueOf(((char) valor));
                        cuerpo = cuerpo + configJson;
                        valor = file.read();
                    }
                    file.close();
                    cuerpo = cuerpo.replaceAll("usuarioServisofts",data.getString("correo"));
                    cuerpo = cuerpo.replaceAll("passServisofts",data.getString("pass"));
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
          
        return cuerpo;
    }
}
