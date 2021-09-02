package component;

import org.json.JSONObject;

import SSComponent.SSManejador;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, SSSessionAbstract session) {
        boolean showLog = true;
        if (data.getString("component").equals("socketTest")) {
            showLog = false;
        }
        if (showLog)
            console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));

        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, session);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, session);
                    break;
                }
                case "mensajeSocket": {
                    MensajeSocket.onMensaje(data, session);
                    break;
                }
                case "socketTest": {
                    new SocketTest(data, session);
                    break;
                }
                case "file": {
                    new SFile(data, session);
                    break;
                }
                case "old": {
                    new Old(data, session);
                    break;
                }
                case "modulo": {
                    new Modulo(data, session);
                    break;
                }
                case "proceso": {
                    new Proceso(data, session);
                    break;
                }
                case "procesoComentario": {
                    new ProcesoComentario(data, session);
                    break;
                }
                case "procesoSeguimiento": {
                    new ProcesoSeguimiento(data, session);
                    break;
                }
                case "tipoSeguimiento": {
                    new TipoSeguimiento(data, session);
                    break;
                }
                case "tipoUsuario": {
                    new TipoUsuario(data, session);
                    break;
                }
                case "servicio": {
                    new servicio(data, session);
                    break;
                }
                case "paquete": {
                    new Paquete(data, session);
                    break;
                }
                case "paqueteServicio": {
                    new PaqueteServicio(data, session);
                    break;
                }
                case "paqueteVenta": {
                    new PaqueteVenta(data, session);
                    break;
                }
                case "locationGoogle": {
                    new LocationGoogle(data, session);
                    break;
                }
                case "sucursal": {
                    new Sucursal(data, session);
                    break;
                }
                case "entrenamiento": {
                    new Entrenamiento(data, session);
                    break;
                }
                case "cliente": {
                    new Cliente(data, session);
                    break;
                }
                case "clientesActivos": {
                    new ClientesActivos(data, session);
                    break;
                }
                case "caja": {
                    new Caja(data, session);
                    break;
                }
                case "tipoPago": {
                    new TipoPago(data, session);
                    break;
                }
                case "cajaMovimiento": {
                    new CajaMovimiento(data, session);
                    break;
                }
                case "cajaTipoMovimiento": {
                    new CajaTipoMovimiento(data, session);
                    break;
                }
                case "cuentaBanco": {
                    new CuentaBanco(data, session);
                    break;
                }
                case "cuentaBancoMovimiento": {
                    new CuentaBancoMovimiento(data, session);
                    break;
                }
                case "sucursalTipoPagoCuentaBanco": {
                    new SucursalTipoPagoCuentaBanco(data, session);
                    break;
                }
                default:
                    redirect(data, session);
            }
        } else {
            data.put("error", "No existe el componente");
        }
    }

    private void redirect(JSONObject data, SSSessionAbstract session){
        switch(data.getString("component")){
            case "rol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "page":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "permiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "rolPermiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioRol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioPage":
                SocketCliete.send("roles_permisos", data, session);
            break;
            default: SSManejador.navigate(data, session);
        }
    }
}