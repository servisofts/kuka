package TipoDato;

import java.util.Base64;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import util.FilesManager;

public class TipoDato {

    public static String insertarTipo(JSONObject data, SSSessionAbstract session) {
        JSONObject objDatoCompleto = data.getJSONObject("dato");
        JSONObject tipo_dato = objDatoCompleto.getJSONObject("tipo_dato_cabecera");
        switch (tipo_dato.getString("descripcion")) {
            case "password auto generado":
                return passwordAutoGenerado(6, session);
            case "carnet de identidad":
                return carnetDeIdentidad(data, session);
            case "direccion completa":
                return direccionCompleta(data);
            case "foto perfil":
                return fotoPerfil(data, session);
            case "correo personal":
                return correopersonal(data, session);
            default:
                return data.getString("data");
        }
    }

    public static String carnetDeIdentidad(JSONObject data, SSSessionAbstract session) {
        try {
            JSONObject info = data.getJSONObject("data");

            if (data.has("key_usuario")) {
                byte[] front = Base64.getDecoder().decode(info.getString("front").getBytes("UTF-8"));
                byte[] back = Base64.getDecoder().decode(info.getString("back").getBytes("UTF-8"));
                info.put("front", FilesManager.guardar_file_(front, "front.png", data.getString("key_usuario"), "ci"));
                info.put("back", FilesManager.guardar_file_(back, "back.png", data.getString("key_usuario"), "ci"));
            } else {
                session.setPendiente("carnetDeIdentidad", new JSONObject(info.toString()));
                info.put("front", "front.png");
                info.put("back", "back.png");
            }
            return info.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    public static String fotoPerfil(JSONObject data, SSSessionAbstract session) {
        try {

            if (data.has("key_usuario")) {
                byte[] foto = Base64.getDecoder().decode(data.getString("data").getBytes("UTF-8"));
                data.put("data",
                        FilesManager.guardar_file_(foto, "perfil.png", data.getString("key_usuario"), "perfil"));
            }
            return data.getString("data");
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    public static String direccionCompleta(JSONObject data) {
        return data.getJSONObject("data").toString();
    }

    public static String correopersonal(JSONObject data, SSSessionAbstract session) {
        session.setPendiente("correo", data);
        return data.getString("data");
    }

    public static String passwordAutoGenerado(int size, SSSessionAbstract session) {
        int max = 90;
        int min = 65;
        String pass = "";
        for (int i = 0; i < size; i++) {
            pass += (char) ((Math.random() * (max - min)) + min);
        }
        session.setPendiente("pass", new JSONObject().put("data", pass));
        return pass;
    }
    public static String codigo_referencia(int size, SSSessionAbstract session) {
        int max = 90;
        int min = 65;
        String pass = "";
        for (int i = 0; i < size; i++) {
            pass += (char) ((Math.random() * (max - min)) + min);
        }
        session.setPendiente("pass", new JSONObject().put("data", pass));
        return pass;
    }
}
