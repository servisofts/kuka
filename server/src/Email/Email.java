package Email;

import java.io.FileReader;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.json.JSONException;
import org.json.JSONObject;

public class Email extends Thread {
    public static final String TIPO_NUEVO_CERTIFICADO = "nuevoCertificado";
    public static final String TIPO_RECIBO = "recibo";

    
    private static final String EMAIL = "servisofts.srl@gmail.com";
    private static final String PASS = "servisofts123.";

    private String Asunto;
    private String CorreoDestino;
    private String Contenido;

    public Email(String tipo, JSONObject data) {
        switch (tipo) {
            case TIPO_NUEVO_CERTIFICADO:
                this.Asunto = "Nuevo certificado";
                CorreoDestino = data.getString("E");
                Contenido = getHtml("NuevoCertificado.html");
                Contenido = Contenido.replaceAll("SevisoftsImagen","data:image/png;base64,"+data.getString("cert"));
                // Contenido = Contenido.replaceAll("usuarioServisofts",data.getString("pass"));
                // Contenido = Contenido.replaceAll("passServisofts",data.getString("pass"));

                break;
            case TIPO_RECIBO:
                this.Asunto = "Tu recibo de Calistenia";
                CorreoDestino = data.getString("__MAIL__");
                Contenido = getHtml("recibo.html");
                String names[] = JSONObject.getNames(data);
                for(int i = 0; i<names.length; i++){
                    Contenido = Contenido.replaceAll(names[i],data.getString(names[i]));
                }

                break;
            default:
              return;
        }
        this.start();
    }

    @Override
    public void run() {
        try {
            Properties props = new Properties();
            props.setProperty("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.ssl.enable", "true");
            props.setProperty("mail.smtp.port", "465");
            props.setProperty("mail.smtp.user", EMAIL);
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(EMAIL));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(CorreoDestino));
            message.setSubject(Asunto);
            message.setContent(Contenido, "text/html");
            Transport t = session.getTransport("smtp");
            t.connect(EMAIL, PASS);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
        } catch (Exception ex) {
            // Logger.getLogger(Email.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static String getHtml(String direccion) throws JSONException {
        String cuerpo = "";
            try {
                    FileReader file;
                    file = new FileReader("emails/"+direccion);
                    int valor = file.read();
                    String configJson = "";
                    while (valor != -1) {
                        configJson = String.valueOf(((char) valor));
                        cuerpo = cuerpo + configJson;
                        valor = file.read();
                    }
                    file.close();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
          
        return cuerpo;
    }

    public static void main(String args[]){
        JSONObject obj = new JSONObject();
        obj.put("__MAIL__","ruddypazd@gmail.com");
        obj.put("__FECHA__","asdas");
        obj.put("__ID_PEDIDO__","sadsdsdfk-sdf-sdfsd-fsd");
        obj.put("__CI__","6340999SC");
        obj.put("__PAQUETE__","Calistenia 2 x 1");
        obj.put("__RENOVACION__","10 324 2353");
        obj.put("__MONTO__","250");
        obj.put("__KEY_USUARIO_CLIENTE__","a34002d9-c8bc-4e58-b98c-ace4aa15f915");
        obj.put("__KEY_PAQUETE__","5");
        
        new Email(Email.TIPO_RECIBO, obj);
    }
}
