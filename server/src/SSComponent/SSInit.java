package SSComponent;

import Config.Config;
import conexion.Conexion;

public class SSInit {
    
    public static void initFunctions(){
        if(!Config.getJSON().getBoolean("production")){
            createTableFromJson();
            getAll();
        }
    }

    private static void createTableFromJson(){
        try {
            String consulta = "create or replace function create_table_from_json(json text, tablename text) returns void language plpgsql as $$ begin execute replace( replace( regexp_replace( json, '(\"[^\"]*\"):(\"[^\"]*\")', '    \1 text', 'g'), '{', format('create table %s (', tablename)), '}', ');'); end $$;";
            Conexion.getConexion().createStatement().execute(consulta);   
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void getAll(){
        try {
            String consulta = "-- FUNCTION: public.get_all(character varying) -- DROP FUNCTION public.get_all(character varying); CREATE OR REPLACE FUNCTION public.get_all( _nombre_tabla character varying) RETURNS SETOF character varying  LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$ DECLARE rec RECORD; respuesta character varying; distancia_permitida character varying; s_consulta character varying; cant_in integer; BEGIN s_consulta :=E' SELECT jsonb_object_agg(sq.key, to_json(sq.*))::json as json  FROM ( SELECT '||_nombre_tabla||E'.* FROM '||_nombre_tabla||E' WHERE '||_nombre_tabla||E'.estado > 0 ) sq'; EXECUTE s_consulta INTO respuesta; RETURN NEXT respuesta; END; $BODY$; ALTER FUNCTION public.get_all(character varying) OWNER TO postgres;";
            Conexion.getConexion().createStatement().execute(consulta);   

            consulta = "-- FUNCTION: public.get_all(character varying, character varying) -- DROP FUNCTION public.get_all(character varying, character varying); CREATE OR REPLACE FUNCTION public.get_all( _nombre_tabla character varying, _key character varying) RETURNS SETOF character varying  LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$ DECLARE rec RECORD; respuesta character varying; distancia_permitida character varying; s_consulta character varying; cant_in integer; BEGIN s_consulta :=E'  SELECT jsonb_object_agg(sq.key, to_json(sq.*))::json as json  FROM ( SELECT *  FROM '||_nombre_tabla||E' WHERE key = \''||_key||E'\' AND estado > 0 ) sq'; EXECUTE s_consulta INTO respuesta; RETURN NEXT respuesta; END; $BODY$; ALTER FUNCTION public.get_all(character varying, character varying) OWNER TO postgres; ";
            Conexion.getConexion().createStatement().execute(consulta);   

            consulta = "-- FUNCTION: public.get_all(character varying, character varying, character varying) -- DROP FUNCTION public.get_all(character varying, character varying, character varying); CREATE OR REPLACE FUNCTION public.get_all( _nombre_tabla character varying, _key_valor character varying, _data_valor character varying) RETURNS SETOF character varying  LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$ DECLARE rec RECORD; respuesta character varying; distancia_permitida character varying; s_consulta character varying; cant_in integer; BEGIN s_consulta :=E' SELECT jsonb_object_agg(sq.key, to_json(sq.*))::json as json  FROM ( SELECT '||_nombre_tabla||E'.* FROM '||_nombre_tabla||E' WHERE '||_nombre_tabla||E'.estado > 0 AND '||_nombre_tabla||E'.'||_key_valor||E' = \''||_data_valor||E'\' ) sq'; EXECUTE s_consulta INTO respuesta; RETURN NEXT respuesta; END; $BODY$; ALTER FUNCTION public.get_all(character varying, character varying, character varying) OWNER TO postgres; ";
            Conexion.getConexion().createStatement().execute(consulta);   

            consulta = "-- FUNCTION: public.get_all(character varying, character varying, character varying, character varying) -- DROP FUNCTION public.get_all(character varying, character varying, character varying, character varying); CREATE OR REPLACE FUNCTION public.get_all( _nombre_tabla character varying, _key_valor character varying, _data_valor character varying, _id character varying) RETURNS SETOF character varying  LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$ DECLARE rec RECORD; respuesta character varying; distancia_permitida character varying; s_consulta character varying; cant_in integer; BEGIN s_consulta :=E' SELECT jsonb_object_agg(sq.'||_id||E', to_json(sq.*))::json as json  FROM ( SELECT '||_nombre_tabla||E'.* FROM '||_nombre_tabla||E' WHERE '||_nombre_tabla||E'.estado > 0 AND '||_nombre_tabla||E'.'||_key_valor||E' = \''||_data_valor||E'\' ) sq'; EXECUTE s_consulta INTO respuesta; RETURN NEXT respuesta; END; $BODY$; ALTER FUNCTION public.get_all(character varying, character varying, character varying, character varying) OWNER TO postgres; ";
            Conexion.getConexion().createStatement().execute(consulta);   
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}