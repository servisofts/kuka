import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import usuarioReducer from './usuarioReducer';
import permisoReducer from './permisoReducer';
import permisoPageReducer from './permisoPageReducer';
import rolReducer from './rolReducer';
import imageReducer from './imageReducer';
import rolPermisoReducer from './rolPermisoReducer';
import usuarioPageReducer from './usuarioPageReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import fileReducer from './fileReducer';
import fileSeguimiento from './fileSeguimiento';
import oldReducer from './oldReducer';
import moduloReducer from './moduloReducer';
import procesoReducer from './procesoReducer';
import procesoComentarioReducer from './procesoComentarioReducer';
import procesoSeguimientoReducer from './procesoSeguimientoReducer';
import tipoSeguimientoReducer from './tipoSeguimientoReducer';
import tipoUsuarioReducer from './tipoUsuarioReducer';
import servicioReducer from './servicioReducer';
import paqueteReducer from './paqueteReducer';
import paqueteServicioReducer from './paqueteServicioReducer';
import paqueteUsuarioReducer from './paqueteUsuarioReducer';
import locationGoogleReducer from './locationGoogleReducer';
import sucursalReducer from './sucursalReducer';
import SSRolesPermisos from '../SSRolesPermisos/Reducer';
import entrenamientoReducer from './entrenamientoReducer';
import paqueteVentaReducer from './paqueteVentaReducer';
import cajaReducer from './cajaReducer';
import tipoPagoReducer from './tipoPagoReducer';
import cajaMovimientoReducer from './cajaMovimientoReducer';
import cajaTipoMovimientoReducer from './cajaTipoMovimientoReducer';
import bancoReducer from './bancoReducer';
import cuentaBancoReducer from './cuentaBancoReducer';
import cuentaBancoMovimientoReducer from './cuentaBancoMovimientoReducer';
import clientesActivosReducer from './clientesActivosReducer';
import sucursalTipoPagoCuentaBancoReducer from './sucursalTipoPagoCuentaBancoReducer';
export default combineReducers({
    paqueteVentaReducer,
    entrenamientoReducer,
    cabeceraDatoReducer,
    socketReducer,
    usuarioReducer,
    clientesActivosReducer,
    permisoReducer,
    permisoPageReducer,
    imageReducer,
    rolReducer,
    rolPermisoReducer,
    usuarioPageReducer,
    fileReducer,
    fileSeguimiento,
    oldReducer,
    moduloReducer,
    procesoReducer,
    procesoComentarioReducer,
    procesoSeguimientoReducer,
    tipoSeguimientoReducer,
    tipoUsuarioReducer,
    servicioReducer,
    paqueteReducer,
    paqueteServicioReducer,
    paqueteUsuarioReducer,
    locationGoogleReducer,
    sucursalReducer,
    cajaReducer,
    tipoPagoReducer,
    cajaMovimientoReducer,
    cajaTipoMovimientoReducer,
    bancoReducer,
    cuentaBancoReducer,
    cuentaBancoMovimientoReducer,
    sucursalTipoPagoCuentaBancoReducer,
    ...SSRolesPermisos
});