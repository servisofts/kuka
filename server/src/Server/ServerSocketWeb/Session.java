package Server.ServerSocketWeb;

import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.json.JSONObject;

@WebSocket
public class Session {
    private SessionSocketWeb MiSession;
    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        JSONObject obj = new JSONObject();
        obj.put("estado","close");
        obj.put("statusCode",statusCode);
        obj.put("reasom",reason);
        MiSession.onClose(obj);
    }

    @OnWebSocketConnect
    public void onConnect(org.eclipse.jetty.websocket.api.Session session) {
        this.MiSession = new SessionSocketWeb(session);
    }

    @OnWebSocketMessage
    public void onMessage(String msg) {
        MiSession.onMessage(msg);
    }

    @OnWebSocketError
    public void onError(Throwable cause) {
        JSONObject obj = new JSONObject();
        obj.put("estado","error");
        obj.put("error",cause.getMessage());
        MiSession.onError(obj);
    }

}