package component;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import com.mysql.cj.protocol.Resultset;
import com.mysql.cj.x.protobuf.MysqlxPrepare.Prepare;

import org.json.JSONArray;
import org.json.JSONObject;
import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class Mesa {
    public Mesa(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
            break;
            case "registro":
                registro(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "subirFoto":
            subirFoto(data, session);
            break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try{
            String consulta =  "select mesa_get_all() as json";
            JSONObject mesa = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", mesa);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getJSONObject("data").getString("key");
            String consulta =  "select mesa_get_by_key('"+key+"') as json";
                JSONObject mesa = Conexion.ejecutarConsultaObject(consulta);
                Conexion.historico(obj.getString("key_usuario"), key, "mesa_getByKey", new JSONObject().put("key", key));
                obj.put("data", mesa);
                obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            JSONObject data = obj.getJSONObject("data");

            String consulta =  "select get_by_key('tipo_mesa', '"+data.getString("key_tipo_mesa")+"') as json";
            JSONObject tipo_mesa = Conexion.ejecutarConsultaObject(consulta).getJSONObject(data.getString("key_tipo_mesa"));

            JSONObject mesa;
            consulta =  "select count(mesa.key) as cantidad  from mesa where mesa.estado > 0 and mesa.key_tipo_mesa = '"+data.getString("key_tipo_mesa")+"'";
            int cantidadActualMesas = Conexion.ejecutarConsultaInt(consulta);
            
            int nuevas=data.getInt("cantidad")-cantidadActualMesas;
            JSONArray mesas = new JSONArray();
            for (int i = 0; i < nuevas; i++) {
                cantidadActualMesas++;
                mesa = new JSONObject();
                mesa.put("key",UUID.randomUUID().toString());
                mesa.put("key_tipo_mesa",tipo_mesa.getString("key"));
                mesa.put("descripcion",tipo_mesa.getString("codigo"));
                mesa.put("codigo",cantidadActualMesas);
                mesa.put("fecha_on", formatter.format(new Date()));
                mesa.put("estado",1);
                mesas.put(mesa);
            }
            
            Conexion.insertArray("mesa", mesas);
            obj.put("data", mesas);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject mesa = obj.getJSONObject("data");
            Conexion.editObject("mesa", mesa);
            Conexion.historico(obj.getString("key_usuario"),mesa.getString("key"), "mesa_editar", mesa);
            obj.put("data", mesa);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session)  {
        try{
           
            String url = Config.getJSON().getJSONObject("files").getString("url")+"mesa/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "mesa_subirFoto", new JSONObject().put("url", url));
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
