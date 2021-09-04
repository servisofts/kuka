package Server.ServerSocket;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;

import SSL.SSL;
import Server.SSSAbstract.SSServerAbstract;
import util.console;

public class ServerSocket extends SSServerAbstract {

    public ServerSocket(int puerto) {
        super(puerto, TIPO_SOCKET);
    }

    @Override
    public void Start(int puerto) {
        try {
            Thread t = new Thread() {
                @Override
                public void run() {
                    try {
                        printLog("Iniciando server...");
                        SSLContext ss = SSL.getSSLContext();
                        SSLServerSocketFactory ssf = ss.getServerSocketFactory();
                        SSLServerSocket s;
                        s = (SSLServerSocket) ssf.createServerSocket(getPuerto());
                        printLog("Socket iniciado esperando conexion...");
                        while (true) {
                            SSLSocket socket = (SSLSocket) s.accept();
                            SessionSocket session = new SessionSocket(socket, ServerSocket.this);
                        }
                    } catch (Exception e) {
                        printLog("Error: " + e.getMessage());
                    }
                }
            };
            t.start();
        } catch (Exception e) {
            printLog("Error: " + e.getMessage());
        }
    }

    @Override
    public void printLog(String mensaje) {
        console.log(console.ANSI_BLUE, getTipoServer() + ": " + mensaje);
    }

}
