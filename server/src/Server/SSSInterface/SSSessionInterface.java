package Server.SSSInterface;

import org.json.JSONObject;

import component.MensajeSocket;

public interface SSSessionInterface {
    
    public void onClose(JSONObject obj);
    public void onMessage(String mensaje);
    public void onError(JSONObject obj);
    public void send(String mensaje);
    public void send(String mensaje, MensajeSocket mensajeSocket);
    public void printLog(String mensaje);

}
