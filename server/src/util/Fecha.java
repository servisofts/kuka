package util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Fecha {
    public static String now() {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
        String fecha_on = formatter.format(new Date());
        return fecha_on;
    }
}
