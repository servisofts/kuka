package SocketCliente;

import util.*;

import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class UsuarioV2 {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public UsuarioV2(JSONObject data) {
        switch (data.getString("type")) {
            case "login": {
                login(data);
                break;
            }
            case "loginFacebook": {
                loginFacebook(data);
                break;
            }
            case "loginGmail": {
                loginGmail(data);
                break;
            }
            case "registro": {
                registro(data);
                break;
            }
            case "registroFacebook": {
                registro(data);
                break;
            }
            case "getCi": {
                getCi(data);
                break;
            }
            case "confirmarDatos": {
                confirmarDatos(data);
                break;
            }

        }
    }

    public void login(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void loginFacebook(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void loginGmail(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void registro(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));

                session.setKeyUsuario(data.getString("key"));
                
                String correo = data.getString("Correo");
                String pass = data.getString("Password");


                JSONObject infoUser = new JSONObject();
                infoUser.put("correo", correo);
                infoUser.put("pass", pass);
                System.out.println("ENIO EL CORREO");
                new EmailRegistroUsr(infoUser).start();
                System.out.println("NOTIFICAR QUE SE REGISTRO UN NUEVO USUARIO");

                
                if(obj.has("key_rol")){
                    JSONObject usuario_rol = new JSONObject();
                    usuario_rol.put("component", "usuarioRol");
                    usuario_rol.put("type", "registro");
                    usuario_rol.put("key_usuario", data.getString("key"));
                    JSONObject data_usuario_rol = new JSONObject();
                    data_usuario_rol.put("key_rol", obj.getString("key_rol"));
                    data_usuario_rol.put("key_usuario", data.getString("key"));
                    usuario_rol.put("data", data_usuario_rol);
                    SocketCliete.send("roles_permisos", usuario_rol, session);
                }


                JSONObject objNotificacion = new JSONObject(obj.toString());
                objNotificacion.put("component", "notificacion");
                objNotificacion.put("type", "registro");
                objNotificacion.put("data", data);

                objNotificacion.put("component", "usuario");
                
                SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, objNotificacion.toString());
                //new Manejador(objNotificacion, session);
                // SocketWeb.sendAll(objNotificacion.toString());
            }

        }

    }

    public void getCi(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            System.out.println("llego IMAGEN");
            // System.out.println(obj.toString());
        }

    }

    public void confirmarDatos(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            String key_usuario = obj.getString("key_usuario_modificado");
            // SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB,
            // objNotificacion.toString());
            SSServerAbstract.sendUsers(obj.toString(), new JSONArray().put(key_usuario));
            // System.out.println(obj.toString());
        }

    }
}