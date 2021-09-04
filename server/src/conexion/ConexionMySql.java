package conexion;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Savepoint;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONArray;
import org.json.JSONObject;

public class ConexionMySql {

    private static Connection con;
    private static String ip;
    private static String puerto;
    private static String usuario;
    private static String contrasena;
    private static String bd_name;
    private static String ruta_pg_dump;
    private static String ruta_pg_restore;

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

    private static Connection conectar() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            try {
                if (con != null) {
                    if (!con.isClosed()) {
                        return con;
                    }
                }
                System.out.println("Conectando a la base de datos mysql...");
                con = DriverManager.getConnection("jdbc:mysql://" + ip + ":" + puerto + "/" + bd_name + "", usuario,
                        contrasena);
                System.out.println("Conexion exitosa mysql");
                // restore_backup();
                //save_backup();
                return con;
            } catch (SQLException e) {
                //
                System.out.println("ERROR EN LA CONECCION");
            }
            return con;
        } catch (Exception e) {
            System.out.println("Error en la conexcion: " + e.getLocalizedMessage());
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

    public static void insertArray(String nombre_tabla, JSONArray json) throws SQLException {
        String funct = "insert into " + nombre_tabla + " (select * from json_populate_recordset(null::" + nombre_tabla
                + ", '" + json.toString() + "')) RETURNING key";
        PreparedStatement ps = con.prepareStatement(funct);
        ps.executeQuery();
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
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void ejecutarUpdate(String consulta) {
        try {
            PreparedStatement ps = con.prepareStatement(consulta);
            ps.executeUpdate();
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
        return true;
    }

    public static boolean save_backup() {
        boolean hecho = false;
        Process proceso;
        ProcessBuilder constructor;
        String path = new File(".").getAbsolutePath();
        path = path.substring(0, path.length() - 1);
        path += bd_name;
        // C:\Program Files\PostgreSQL\12\bin
        try {
            System.out.println("Guardando backup en " + path);
            File pgdump = new File(ruta_pg_dump);
            if (pgdump.exists()) {
                if (!path.equalsIgnoreCase("")) {
                    constructor = new ProcessBuilder(ruta_pg_dump, "--verbose", "--format", "custom", "-f", path);
                } else {
                    constructor = new ProcessBuilder(ruta_pg_dump, "--verbose", "--inserts", "--column-inserts", "-f",
                            path);
                    System.out.println("ERROR");
                }
                constructor.environment().put("PGHOST", ip);
                constructor.environment().put("PGPORT", puerto);
                constructor.environment().put("PGUSER", usuario);
                constructor.environment().put("PGPASSWORD", contrasena);
                constructor.environment().put("PGDATABASE", bd_name);
                constructor.redirectErrorStream(true);
                proceso = constructor.start();
                InputStream is = proceso.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                String ll;
                while ((ll = br.readLine()) != null) {
                    System.out.println(ll);
                }
                System.out.println(proceso);
                System.out.println("terminado backup " + path);
                hecho = true;
            } else {
                System.out.println("Error en la ruta del pg_dump ingrese nuevamente");
                hecho = false;
            }
        } catch (Exception ex) {
            System.err.println(ex.getMessage() + "Error de backup");
            hecho = false;
        }
        return hecho;
    }

    public static boolean restore_backup() {
        boolean hecho = false;
        Process proceso;
        ProcessBuilder constructor;
        String path = new File(".").getAbsolutePath();
        path = path.substring(0, path.length() - 1);
        path += bd_name;
        try {
            System.out.println("Restaurando Base de datos desde " + path + " ");
            File pgrestore = new File(ruta_pg_restore);
            if (pgrestore.exists()) {
                constructor = new ProcessBuilder(ruta_pg_restore, "-h", ip, "-p", puerto, "-U", usuario, "-C", "-d",
                        bd_name, "-v", path);
                constructor.environment().put("PGPASSWORD", contrasena);
                constructor.redirectErrorStream(true);
                proceso = constructor.start();
                InputStream is = proceso.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                String ll;
                while ((ll = br.readLine()) != null) {
                    System.out.println(ll);
                }
                proceso.destroy();
                hecho = true;
            } else {
                System.out.println("Error en la ruta del pg_dump ingrese nuevamente");
                hecho = false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            hecho = false;
        }
        return hecho;
    }

    public static void setContrasena(String contrasena) {
        ConexionMySql.contrasena = contrasena;
    }

    public static void setPuerto(String puerto) {
        ConexionMySql.puerto = puerto;
    }

    public static void setIp(String ip) {
        ConexionMySql.ip = ip;
    }

    public static void setUsuario(String usuario) {
        ConexionMySql.usuario = usuario;
    }

    public static void setBd_name(String bd_name) {
        ConexionMySql.bd_name = bd_name;
    }

    public static void setRuta_pg_dump(String ruta_pg_dump) {
        ConexionMySql.ruta_pg_dump = ruta_pg_dump;
    }

    public static void setRuta_pg_restore(String ruta_pg_restore) {
        ConexionMySql.ruta_pg_restore = ruta_pg_restore;
    }

}