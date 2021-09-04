package FireBase;

import org.json.JSONObject;

public class FireBaseTokens {

    public static JSONObject tokens = new JSONObject();
    public static JSONObject usuarios = new JSONObject();

    public static void setToken(String token,String app) {
        JSONObject objToken = new JSONObject();
        objToken.put("token", token);
        objToken.put("app", app);
        objToken.put("key_usuario", "");
        tokens.put(token, objToken);
    }
    public static void setTokenUsuario(String token,String app,String key_usuario) {
        JSONObject objToken = new JSONObject();
        objToken.put("token", token);
        objToken.put("app", app);
        objToken.put("key_usuario", key_usuario);
        tokens.put(token, objToken);
        usuarios.put(key_usuario,objToken);
    }
}
