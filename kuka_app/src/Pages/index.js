import CargaPage from './CargaPage'
import InicioPage from './InicioPage'
import LoginPage from './LoginPage'

import CarpetasPage from './CarpetasPage'
import FilePerfil from './FilePerfil'

import LobyPage from './LobyPage'
import LobyTecnologiasPage from './LobyTecnologiasPage'
import LobySobreNosotrosPage from './LobySobreNosotrosPage'
import DescargaPage from './DescargaPage'


import UsuarioPage from './UsuarioPage'
import UsuarioPerfilPage from './UsuarioPerfilPage'
import UsuarioRegistroPage from './UsuarioRegistroPage'
import TestRNF from './TestRNF'

import ServisoftsPage from './ServisoftsPage'
import BaseDatosPage from './BaseDatosPage'
import AseguramientoPage from './AseguramientoPage'
import CodigoPage from './CodigoPage'
import ServidorPage from './ServidorPage'
import PresentacionCalisPage from './PresentacionCalisPage'
import ModuloRegistroPage from './ModuloRegistroPage'
import ModuloPerfilPage from './ModuloPerfilPage'
import ProcesoRegistroPage from './ProcesoRegistroPage'
import ProcesoPerfilPage from './ProcesoPerfilPage'
import ProcesoComentarioRegistroPage from './ProcesoComentarioRegistroPage'
import ProcesoSeguimietoRegistroPage from './ProcesoSeguimietoRegistroPage'
import ClientesPage from './ClientesPage'
import ClienteRegistroPage from './ClienteRegistroPage'
import ClientePerfilPage from './ClientePerfilPage'
import RRHHPage from './RRHHPage'
import ServiciosPage from './ServiciosPage'
import ServicioPerfilPage from './ServicioPerfilPage'
import PaquetePage from './PaquetePage'
import PaqueteRegistroPage from './PaqueteRegistroPage'
import ServisoftsUsuarioConErrorPage from './ServisoftsUsuarioConErrorPage'
import ClientePaqueteRegistroPage from './ClientePaqueteRegistroPage'
import ClientesPageSelect from './ClientesPageSelect'
import SucursalPage from './SucursalPage'
import SucursalRegistroPage from './SucursalRegistroPage'
import BuscarDireccionPage from './BuscarDireccionPage'

import EntrenadorPage from './EntrenadorPage'
import EntrenadorPerfilPage from './EntrenadorPerfilPage'
import EntrenamientoRegistroPage from './EntrenamientoRegistroPage'
import UsuarioEliminadoPage from './UsuarioEliminadoPage'
import EntrenamientoPage from './EntrenamientoPage'
import CalendarioPage from './CalendarioPage'
import ProveedoresPage from './Proveedor/ProveedoresPage'
import ProveedorRegistroPage from './Proveedor/ProveedorRegistroPage'
import Caja from "./Caja"
import Finanzas from "./Finanzas"
import SSRolesPermisos from '../SSRolesPermisos/Pages';
import SComponent from '../SComponent/Pages';
import TipoPago from './TipoPago'
import ClientePaqueteRegistroConfirmacion from './ClientePaqueteRegistroConfirmacion'
import Banco from './Banco'
import VentasPage from './VentasPage/index';
import AjustesPage from './AjustesPage'
export const getPages = () => {
    return {
        // TestRNF,
        CargaPage,
        LobyPage,
        LobyTecnologiasPage,
        LobySobreNosotrosPage,
        LoginPage,
        InicioPage,
        UsuarioPage,
        UsuarioPerfilPage,
        AjustesPage,
        UsuarioPerfilPage,
        UsuarioRegistroPage,
        CarpetasPage,
        FilePerfil,
        DescargaPage,
        ServisoftsPage,
        BaseDatosPage,
        AseguramientoPage,
        CodigoPage,
        CodigoPage,
        ServidorPage,
        PresentacionCalisPage,
        ModuloRegistroPage,
        ModuloPerfilPage,
        ProcesoRegistroPage,
        ProcesoPerfilPage,
        ProcesoComentarioRegistroPage,
        ProcesoSeguimietoRegistroPage,
        VentasPage,
        ClientesPage,
        ClientesPageSelect,
        ClienteRegistroPage,
        RRHHPage,
        ClientePerfilPage,
        ServicioPerfilPage,
        ServiciosPage,
        ServisoftsUsuarioConErrorPage,
        PaqueteRegistroPage,
        PaquetePage,
        ClientePaqueteRegistroPage,
        SucursalPage,
        BuscarDireccionPage,
        SucursalRegistroPage,
        EntrenadorPerfilPage,
        EntrenadorPage,
        EntrenamientoPage,
        EntrenamientoRegistroPage,
        UsuarioEliminadoPage,
        CalendarioPage,
        ProveedoresPage,
        ProveedorRegistroPage,
        ClientePaqueteRegistroConfirmacion,
        ...TipoPago,
        ...Caja,
        ...Finanzas,
        ...SComponent,
        ...Banco,
        ...SSRolesPermisos
    }
}