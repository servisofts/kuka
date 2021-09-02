package ServerHttp;

import java.net.URI;
import util.console;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

import Config.Config;
import java.util.List;
import util.FilesManager;

import org.json.JSONArray;
import org.json.JSONObject;

import component.Documento;
import component.Manejador;
import conexion.Conexion;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.net.InetSocketAddress;
import java.io.UnsupportedEncodingException;
import org.apache.commons.fileupload.FileItem;
import org.jboss.com.sun.net.httpserver.Headers;
import org.jboss.com.sun.net.httpserver.HttpServer;
import org.apache.commons.fileupload.RequestContext;
import org.jboss.com.sun.net.httpserver.HttpContext;

import org.jboss.com.sun.net.httpserver.HttpExchange;
import org.jboss.com.sun.net.httpserver.HttpPrincipal;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class ServerHttp {

    public static void Start(int puerto) {
        HttpServer server;
        try {
            console.log(console.ANSI_YELLOW, "** Iniciando HTTP-SERVER " + Config.getJSON().getString("ss") + " en el puerto " + puerto + " **");
            server = HttpServer.create(new InetSocketAddress(puerto), 0);
            //Instaciamos servlet de imagenes
            HttpContext context = server.createContext("/");
            HttpContext contextMultipar = server.createContext("/multipart");
            context.setHandler(ServerHttp::handleRequest);
            //Instaciamos servlet mannejador
            HttpContext contextManejador = server.createContext("/manejador");
            contextManejador.setHandler(HandleRequestManejador::handle);
            contextMultipar.setHandler(ServerHttp::handleRequestMultipart);
            server.start();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    private static void handleRequestMultipart(HttpExchange t) throws IOException {
        for (java.util.Map.Entry<String, List<String>> header : t.getRequestHeaders().entrySet()) {
            System.out.println(header.getKey() + ": " + header.getValue().get(0));
        }
        DiskFileItemFactory d = new DiskFileItemFactory();

        try {
            ServletFileUpload up = new ServletFileUpload(d);
            List<FileItem> result = up.parseRequest(new RequestContext() {

                @Override
                public String getCharacterEncoding() {
                    return "UTF-8";
                }

                @Override
                public int getContentLength() {
                    return 0; // tested to work with 0 as return
                }

                @Override
                public String getContentType() {
                    return t.getRequestHeaders().getFirst("Content-type");
                }

                @Override
                public InputStream getInputStream() throws IOException {
                    return t.getRequestBody();
                }

            });
            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.getResponseHeaders().add("Content-type", "text/plain");
            t.sendResponseHeaders(200, 0);
            
        if (t.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            t.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            t.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            t.sendResponseHeaders(204, -1);
            return;
        }

            
            String data = "";
            InputStream file = null;
            String nombre="";
            List<Documento> documentos = new ArrayList<>();
            JSONArray docs = new JSONArray();
            for (FileItem fi : result) {
                switch (fi.getFieldName()) {
                    case "file":
                        nombre = fi.getName();
                        file = fi.getInputStream();
                        documentos.add(new Documento(nombre, file));
                        docs.put(nombre);
                        break;
                    case "data":
                        data = fi.getString();
                        break;
                }
            }

            
            JSONObject obj = new JSONObject(data);
            obj.put("documentos",docs);
            new Manejador(obj, null);
            if (obj.getString("estado").equals("exito")) {
                /*
                Roy Ruddy Paz Demiquel 14 05 2021
                No te olvides de setear la variable dir en tu type de subida para que guarden los documentos
                */
                if (obj.has("dirs")) {
                    File aux;
                    
                    for (int i = 0; i < documentos.size(); i++) {
                        aux = new File(obj.getJSONArray("dirs").getString(i));
                        //FilesManager.guardar_file(documentos.get(i).getFile(), obj.getJSONArray("dirs").getString(i));
                        copyInputStreamToFile(documentos.get(i).getFile(), aux);
                        switch(obj.getString("component")){
                            case "SFile":
                        //        obj.getJSONArray("data").getJSONObject(i).put("tamano", aux.length()+"");
                                Conexion.editObject("file", obj.getJSONArray("data").getJSONObject(i));   
                            break;
                        }
                    }
                }
            }
            t.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private static void handleRequest(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
        
        String ruta = Config.getJSON("files").getString("url");
        URI requestURI = exchange.getRequestURI();
        String path  = requestURI.getPath().replaceAll("/", "");

        String [] paths = path.split("_");
        ruta=ruta+paths[0]+"/"+paths[1];
        File file = new File (ruta);
        if(!file.exists()){
            file = new File("./default.png");
        }
        byte [] bytearray  = new byte [(int)file.length()];
        FileInputStream fis = new FileInputStream(file);
        BufferedInputStream bis = new BufferedInputStream(fis);
        bis.read(bytearray, 0, bytearray.length);
        exchange.sendResponseHeaders(200, file.length());
        OutputStream os = exchange.getResponseBody();
        os.write(bytearray,0,bytearray.length);
        os.close();
    }

    private static void copyInputStreamToFile(InputStream inputStream, File file) throws IOException {

        // append = false
        try (FileOutputStream outputStream = new FileOutputStream(file, false)) {
            int read;
            byte[] bytes = new byte[8192];
            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            System.out.println("Imagen insertada con exito: " + file.getAbsolutePath());
            outputStream.close();
        }

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

    private static void printRequestInfo(HttpExchange exchange) {
        System.out.println("-- headers --");
        Headers requestHeaders = exchange.getRequestHeaders();
        requestHeaders.entrySet().forEach(System.out::println);

        System.out.println("-- principle --");
        HttpPrincipal principal = exchange.getPrincipal();
        System.out.println(principal);

        System.out.println("-- HTTP method --");
        String requestMethod = exchange.getRequestMethod();
        System.out.println(requestMethod);

        System.out.println("-- query --");
        URI requestURI = exchange.getRequestURI();
        String query = requestURI.getQuery();
        System.out.println(query);
    }
   

}