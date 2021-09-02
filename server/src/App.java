import Config.Config;
import SSL.SSL;
import SocketCliente.SocketCliete;
import conexion.Conexion;
import util.console;

public class App {
    public static void main(String[] args) throws Exception {
        System.setProperty("org.eclipse.jetty.util.log.announce", "false");
        if (!Config.validate()) {
            console.error("Server closed.");
            return;
        }
        
        SSL.getKeyStore();
        // Registrar mi certificado default si no existe
        if (!SSL.defaultCert()) { 
            console.error("Server closed.");
            return;
        }
        //Cargar el pem del servidor
        if (!SSL.servicioCert()) {
            console.error("Server closed.");
            return;
        }
        console.log(console.ANSI_GREEN ,SSL.getPem(SSL.getCert(Config.getJSON().getString("nombre"))));
        SocketCliete.enableReconect(true);
        SocketCliete.Start(Config.getJSON("socket_client").getJSONObject("servicio"));
        Conexion.setConexion(Config.getJSON("data_base"));
        // SSInit.initFunctions();
        // ConexionMySql.setConexion(Config.getJSON("data_base_mysql"));
        //new Migrador().run();
    }
}