package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Savepoint;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONArray;
import org.json.JSONObject;

import util.console;

public class Conexion {

    private static Connection con;
    private static String ip;
    private static String puerto;
    private static String usuario;
    private static String contrasena;
    private static String bd_name;

    public static Connection getConexion() {
        return conectar();
    }

    public static Connection setConexion(JSONObject data_base) {
        ip = data_base.getString("ip");
        bd_name = data_base.getString("bd_name");
        puerto = data_base.getInt("puerto") + "";
        usuario = data_base.getString("user");
        contrasena = data_base.getString("pass");
        return conectar();

    }

    public static void historico(String key_usuario, String descripcion, JSONObject data){
        try{
            String key = UUID.randomUUID().toString();
            JSONObject historico = new JSONObject();
            historico.put("key",key);
            historico.put("key_usuario",key_usuario);
            historico.put("data",data);
            historico.put("descripcion",descripcion);
            historico.put("fecha_on","now()");
            historico.put("estado",1);
            insertArray("historico", new JSONArray().put(historico));
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    public static void historico(String key_usuario, String key_aux, String descripcion, JSONObject data){
        try{
            String key = UUID.randomUUID().toString();
            JSONObject historico = new JSONObject();
            historico.put("key",key);
            historico.put("key_usuario",key_usuario);
            historico.put("key_aux",key_aux);
            historico.put("data",data);
            historico.put("descripcion",descripcion);
            historico.put("fecha_on","now()");
            historico.put("estado",1);
            insertArray("historico", new JSONArray().put(historico));
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    private static Connection conectar() {
        try {
            Class.forName("org.postgresql.Driver");
            try {
                if (con != null) {
                    if (!con.isClosed()) {
                        return con;
                    }
                }
                console.log(console.ANSI_BLUE,"Conectando a la base de datos postgress...");
                System.out.println();
                con = DriverManager.getConnection("jdbc:postgresql://" + ip + ":" + puerto + "/" + bd_name, usuario,
                        contrasena);
                        console.log(console.ANSI_BLUE,"Conexion exitosa postgres");
                return con;
            } catch (SQLException e) {
                // restore_backup();
                console.log(console.ANSI_BLUE,"Base de datos restaurada exitosamente");
            }
            return con;
        } catch (Exception e) {
            console.log(console.ANSI_BLUE,"Error en la conexion: " + e.getLocalizedMessage());
            return null;
        }
    }

    public static void Transacction() {
        try {
            if (con.getAutoCommit()) {
                con.setAutoCommit(false);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public static void Transacction_end() {
        try {
            if (!con.getAutoCommit())
                con.setAutoCommit(true);
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public static void commit() {
        try {
            con.commit();
        } catch (SQLException ex) {
            // Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public static void rollback() {
        try {
            con.rollback();
        } catch (SQLException ex) {
            // Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public void rollback(Savepoint savepoint) {
        try {
            con.rollback(savepoint);
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static PreparedStatement preparedStatement(String query) throws SQLException {
        return getConexion().prepareStatement(query);
    }

    public static void insertArray(String nombre_tabla, JSONArray json) throws SQLException{
        String funct = "insert into " + nombre_tabla + " (select * from json_populate_recordset(null::" + nombre_tabla
            + ", '" + json.toString() + "')) RETURNING key";
        PreparedStatement ps = con.prepareStatement(funct);
        ps.executeQuery();
        ps.close();
    }

    public static void createTable(String nombre_tabla, JSONObject tabla){
        try{
            String funct = "EXECUTE create_table_from_json('" + nombre_tabla + "','" + tabla.toString() + "'); ";
            PreparedStatement ps = con.prepareStatement(funct);
            ps.executeQuery();
            ps.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static void anular(String nombre_tabla, String key) throws SQLException {
        String funct = "update " + nombre_tabla + " set estado = 0 where key = '"+key+"'";
        ejecutarUpdate(funct);
    }

    public static boolean editObject(String nombre_tabla, JSONObject obj) throws SQLException {

        if(obj.isNull("key")){
            return false;
        }

        String consulta =  "SELECT public.desc_tabla('"+nombre_tabla+"') as json";
        JSONArray tabla = Conexion.ejecutarConsultaArray(consulta);
        JSONObject tupla;
        String aux="";
        for(int i=0; i<tabla.length();i++){
            tupla = tabla.getJSONObject(i);
            if(!tupla.getString("column_name").equals("key") && !tupla.getString("column_name").equals("key") && !tupla.getString("column_name").equals("fecha_on")){
                if(!obj.isNull(tupla.getString("column_name"))){
                    switch(tupla.getString("data_type")){
                        case "character varying":
                            aux+=tupla.getString("column_name")+"='"+obj.getString(tupla.getString("column_name"))+"',";   
                        break;
                        case "timestamp without time zone":
                            aux+=tupla.getString("column_name")+"='"+obj.getString(tupla.getString("column_name"))+"',";   
                        break;
                        case "double precision":
                            aux+=tupla.getString("column_name")+"="+obj.getDouble(tupla.getString("column_name"))+",";   
                        break;
                        case "integer":
                            aux+=tupla.getString("column_name")+"="+obj.getInt(tupla.getString("column_name"))+",";   
                        break;
                        default :
                            aux+=tupla.getString("column_name")+"='"+obj.getString(tupla.getString("column_name"))+"',";   
                        break;
                    }
                }
            }
        }   
        if(aux.length()==0){
            return false;
        }

        aux = aux.substring(0,aux.length()-1);
        
        String funct = "update "+nombre_tabla+" set "+aux+" where key ='"+obj.getString("key")+"'";
        PreparedStatement ps = con.prepareStatement(funct);
        ps.executeUpdate();
        ps.close();
        return true;
    }

    public static JSONArray ejecutarConsultaArray(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        JSONArray arr = new JSONArray();
        if (rs.next()) {
            arr = rs.getString("json") == null ? new JSONArray() : new JSONArray(rs.getString("json"));
        }
        rs.close();
        ps.close();
        return arr;
    }

    public static int ejecutarConsultaInt(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        int resp = 0;
        if (rs.next()) {
            resp = rs.getInt(1);
        }
        rs.close();
        ps.close();
        return resp;
    }

    public static void ejecutar(String consulta) {
        try {
            PreparedStatement ps = con.prepareStatement(consulta);
            ps.executeQuery();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void ejecutarUpdate(String consulta) {
        try {
            PreparedStatement ps = con.prepareStatement(consulta);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static JSONObject ejecutarConsultaObject(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        JSONObject obj = new JSONObject();
        if (rs.next()) {
            obj = rs.getString("json") != null ? new JSONObject(rs.getString("json")) : new JSONObject();
        }
        rs.close();
        ps.close();
        return obj;
    }

    

    public static void setContrasena(String contrasena) {
        Conexion.contrasena = contrasena;
    }

    public static void setPuerto(String puerto) {
        Conexion.puerto = puerto;
    }

    public static void setIp(String ip) {
        Conexion.ip = ip;
    }

    public static void setUsuario(String usuario) {
        Conexion.usuario = usuario;
    }

    public static void setBd_name(String bd_name) {
        Conexion.bd_name = bd_name;
    }
}