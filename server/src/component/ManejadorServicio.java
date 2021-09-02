package component;

import org.json.JSONObject;

public class ManejadorServicio {
    public static void onMessage(JSONObject obj){
        if(!obj.isNull("component")){
            switch(obj.getString("component")){
                case "servicio":
                    new servicio2(obj);
                break;
            }
        }
       //System.out.println(obj.toString());
    }   
}