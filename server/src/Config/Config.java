package Config;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONObject;

import util.console;

public class Config {

    private static JSONObject config = null;
    
    public static boolean validate() {
        boolean repuesta = true;
        if (getJSON() != null) {
            JSONObject obj = getJSON();
            if (!obj.has("ss")) {
                System.out.println("ss no encontrado.");
                repuesta = false;
            }
            if (!obj.has("nombre")) {
                System.out.println("nombre no encontrado.");
                repuesta = false;
            }
            if (obj.has("data_base")) {
                JSONObject data_base = obj.getJSONObject("data_base");
                if (!data_base.has("bd_name")) {
                    System.out.println("bd_name  no encontrado.");
                    repuesta = false;
                }
                if (!data_base.has("ip")) {
                    System.out.println("ip  no encontrado.");
                    repuesta = false;
                }
                if (!data_base.has("puerto")) {
                    System.out.println(" puerto no encontrado.");
                    repuesta = false;
                }
                if (!data_base.has("user")) {
                    System.out.println("user  no encontrado.");
                    repuesta = false;
                }
                if (!data_base.has("pass")) {
                    System.out.println("pass no encontrado.");
                    repuesta = false;
                }

            } else {
                System.out.println("data_base  no encontrado.");
                repuesta = false;
            }

            if (obj.has("socket_client")) {
                JSONObject socket_client = obj.getJSONObject("socket_client");
                if (socket_client.has("servicio")) {
                    JSONObject servicio = socket_client.getJSONObject("servicio");
                    if (!servicio.has("puerto")) {
                        System.out.println("puerto  no encontrado.");
                        repuesta = false;
                    }
                    if (!servicio.has("ip")) {
                        System.out.println("ip  no encontrado.");
                        repuesta = false;
                    }
                    if (servicio.has("cert")) {
                        JSONObject cert = servicio.getJSONObject("cert");
                        if (!cert.has("pem")) {
                            System.out.println("pem no encontrado.");
                            repuesta = false;
                        }
                    }
                }
            } else {
                System.out.println("socket_client  no encontrado.");
                repuesta = false;
            }
            if (obj.has("ssl")) {
                JSONObject ssl = obj.getJSONObject("ssl");
                if (ssl.has("cert")) {
                    JSONObject cert = ssl.getJSONObject("cert");
                    if (!cert.has("CN")) {
                        System.out.println("puerto  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("OU")) {
                        System.out.println("OU  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("O")) {
                        System.out.println("O  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("C")) {
                        System.out.println("C  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("E")) {
                        System.out.println("E  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("L")) {
                        System.out.println("L  no encontrado.");
                        repuesta = false;
                    }
                    if (!cert.has("ST")) {
                        System.out.println("ST  no encontrado.");
                        repuesta = false;
                    }
                }
            } else {
                System.out.println("ssl  no encontrado.");
                repuesta = false;
            }
        }
        return repuesta;
    }

    public static JSONObject getJSON() {
        try {
            if (config == null) {
                console.log(console.ANSI_GREEN ,"Leyendo archivos config.json");
                FileReader file = new FileReader("config.json");
                int valor = file.read();
                String configJson = "";
                while (valor != -1) {
                    configJson = configJson + String.valueOf(((char) valor));
                    valor = file.read();
                    console.logln(console.ANSI_GREEN ,".");
                }
                file.close();
                config = new JSONObject(configJson);
                console.log(console.ANSI_GREEN ,"100% Ready.");
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return config;
    }

    public static boolean setSocketCliente(JSONObject obj) {
        boolean repuesta = true;
        config.getJSONObject("socket_server").put("ip", obj.getJSONObject("data").getString("ip"));
        config.getJSONObject("socket_server").put("puerto", obj.getJSONObject("data").getInt("puerto"));
        FileWriter file;
        try {
            file = new FileWriter("config.json");
            file.write(config.toString());
            file.flush();
            file.close();

        } catch (IOException e) {
            System.out.println("error actualizar config  " + e);
            repuesta = false;
        }

        return repuesta;
    }

    public static JSONObject getJSON(String key) {

        return getJSON().getJSONObject(key);
    }
}