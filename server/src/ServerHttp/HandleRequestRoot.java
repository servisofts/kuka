package ServerHttp;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.nio.file.Files;
import java.util.Map;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.LinkedHashMap;
import org.jboss.com.sun.net.httpserver.HttpExchange;

import Config.Config;

public class HandleRequestRoot {
    public static void handle(HttpExchange exchange) throws IOException {
        URI requestURI = exchange.getRequestURI();
        Map<String, String> parametros = splitQuery(requestURI.getQuery());
        String imgName = requestURI.getPath().substring(1);
        String type = parametros.get("type");
        
        File file = null;
        String key = "";
        switch (type) {
            case "getCi":
                key = parametros.get("key_usuario");
                file = getCi(file, imgName, key);
                break;
            case "getPerfil":
                key = parametros.get("key_usuario");
                file = getPerfil(file, imgName, key);
                break;
            case "glup":
                key = parametros.get("key");
                file = getGlup(file, imgName, key);
                break;
        }
        // System.out.println(type);
        // printRequestInfo(exchange);

        if (!file.exists()) {
            file = new File("./default.png");
        }
        exchange.sendResponseHeaders(200, file.length());
        OutputStream os = exchange.getResponseBody();
        Files.copy(file.toPath(), os);
        
        // os.write(response.getBytes());
        os.close();
    }

    private static File getCi(File file, String imgName, String key_usuario) throws IOException {
        String url = Config.getJSON("files").getString("url") + key_usuario + "/ci/" + imgName;
        return new File(url);
    }

    private static File getPerfil(File file, String imgName, String key_usuario) throws IOException {
        String url = Config.getJSON("files").getString("url") + key_usuario + "/perfil/" + imgName;
        return new File(url);
    }
    private static File getGlup(File file, String imgName, String key) throws IOException {
        String url = Config.getJSON("files").getString("url_glup") + key + "/" + imgName;
        return new File(url);
    }


    public static Map<String, String> splitQuery(String query) throws UnsupportedEncodingException {
        Map<String, String> query_pairs = new LinkedHashMap<String, String>();

        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            query_pairs.put(URLDecoder.decode(pair.substring(0, idx), "UTF-8"),
                    URLDecoder.decode(pair.substring(idx + 1), "UTF-8"));
        }
        return query_pairs;
    }

}
