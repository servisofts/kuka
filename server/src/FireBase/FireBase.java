package FireBase;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class FireBase {

    private static final String SERVER_TOKEN_GLUP_ANDROID = "AAAAS77TS4w:APA91bFMh3dnFrXc3B7ilZ6kk_lm5XOduh6KC1VproaUCU4G23ll1ygWStx-8pSjhI2hOvelIiNrX5G3LdfcWOZMfx7ILcwKamsdINRWleZ6CqeNsNB788sbugzngcxjJIfFLo6ubHb2";
    // private static final String SERVER_TOKEN_CLINICA_NJ_ANDROID =
    // "AAAA7Rtk5W8:APA91bHMimMzaT8poNPfq_q_F_2tPDUAOtNEZnAGMpXOajljOP5gd_d5jvc1yoeXAGsZqs8SnkNtByaZNtGRUhwM9UyiZ9_g-xoyhY5BitRXJF8iOmU8ahCrCvZySRa8m8bcOiSgSbrC";

    public static JSONObject send(String token, String fbapp, JSONObject data) {
        JSONObject objSend = new JSONObject();
        objSend.put("to", token);
        objSend.put("priority", "high");
        objSend.put("data", data);
        String serverToken = "";
        switch (fbapp) {
            case "glup_android":
                serverToken = SERVER_TOKEN_GLUP_ANDROID;
                break;
        }
        System.out.println("Enviando mensaje FB...");
        JSONObject objResp = new JSONObject(executePost("https://fcm.googleapis.com/fcm/send", serverToken, objSend));
        return objResp;
    }

    public static String executePost(String targetURL, String serverToken, JSONObject objSend) {
        HttpURLConnection connection = null;
        try {
            // Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setRequestProperty("Content-Length", Integer.toString(objSend.toString().getBytes().length));
            connection.setRequestProperty("Authorization", "key=" + serverToken);

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            // Send request
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(objSend.toString());
            wr.close();
            // Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
