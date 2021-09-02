package Server.ServerSocketWeb;

import Server.SSSAbstract.SSServerAbstract;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

public class ServerSocketWeb extends SSServerAbstract {

    public ServerSocketWeb(int puerto) {
        super(puerto, TIPO_SOCKET_WEB);
    }

    @Override
    public void Start(int puerto) {
        int portNumber = puerto;
        try {
            Thread t = new Thread() {
                @Override
                public void run() {
                    try {
                        printLog("Iniciando server...");
                        Server server = new Server(portNumber);
                        WebSocketHandler wsHandler = new WebSocketHandler() {
                            @Override
                            public void configure(WebSocketServletFactory factory) {
                                factory.register(Session.class);
                            }
                        };
                        server.setHandler(wsHandler);
                        server.start();
                        server.join();
                    } catch (Exception e) {
                        // TODO: handle exception
                    }
                }
            };
            t.start();
        } catch (Exception e) {
            printLog("Error: " + e.getLocalizedMessage());
        }

    }

    @Override
    public void printLog(String mensaje) {
        System.out.println(getTipoServer() + ": " + mensaje);
    }

}
