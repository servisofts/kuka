package component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class SocketTest {
    public SocketTest(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "ping":
                ping(data, session);
                break;
        }
    }
    public void ping(JSONObject obj, SSSessionAbstract session) {
        obj.put("estado", "exito");
    }

}