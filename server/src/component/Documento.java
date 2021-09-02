package component;

import java.io.InputStream;

public class Documento {
    
    String nombre = "";
    InputStream file;

    public Documento(String nombre, InputStream file){
        this.nombre = nombre;
        this.file = file;
    }
    
    public InputStream getFile() {
        return file;
    }
    public void setFile(InputStream file) {
        this.file = file;
    }
    
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
