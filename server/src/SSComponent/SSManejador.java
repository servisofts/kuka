package SSComponent;

import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import util.console;

public class SSManejador extends Thread {
    
    public static void navigate(JSONObject data, SSSessionAbstract session) {   
        boolean showLog = true;
        if (data.getString("component").equals("socketTest")) showLog = false;
        if (showLog) console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));
        if (!data.isNull("component")) SSComponent.navigate(data, session);
    }
}
