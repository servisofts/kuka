package component;

import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;

public class RolPermiso extends Thread{
    JSONObject data;

    public RolPermiso(JSONObject data){
        this.data=data;
    }

    public void run(){
        switch(data.getString("component")){
            case "rol":
                
            break;
            case "page":
                
            break;
            case "permiso":
                
            break;
            case "rolPermiso": 
                rolPermiso();
            break;
            case "usuarioRol":
                
            break;
            case "usuarioPage":
                
            break;
        }
    }

    public void rolPermiso(){
        if(data.has("send")){
            JSONObject send = data.getJSONObject("send");
            
            JSONObject obj = new JSONObject();
            obj.put("component", "usuarioPage");
            obj.put("type", "rolPermiso");
            obj.put("estado", "exito");

            JSONObject otro = new JSONObject();
            otro.put("pagina", data.getJSONObject("send").getJSONObject("page"));
            otro.put("permiso", data.getJSONObject("send").getJSONObject("permiso"));
            obj.put("data", otro);

            SSServerAbstract.sendUsers(obj.toString(), send.getJSONArray("usuarios"));
            
        }
    }
    
}
