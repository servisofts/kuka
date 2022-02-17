import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SImage from '../../Component/SImage';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import BarraSuperior from '../../Component/BarraSuperior';
import ListaDetalle from './ListaDetalle';
import Section from './Section';


class LobyTecnologiasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        SSNavigation.setProps(props);

    }

    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center"
                // backgroundColor:"#000",
            }}>
                <BarraSuperior title={"Tecnologias"} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: "100%",
                        maxWidth: 800,
                        flex: 1,
                    }}>
                    <Section
                        titulo={"Ingenieria"}
                        detalle={"En esta sección te explicarémos la manera en la que hacemos las cosas. En nuestras empresas siempre estamos abiertos a críticas constructivas y cambios. Intentaré ordernar las diferentes metodologías de trabajo, de lo más simple a lo más complejo. Encontrarás lenguajes de programación, bases de datos, Robótica, IA, etc."}
                        direction={"left"} ></Section>
                    <Section
                        titulo={"Front-End"}
                        detalle={"El Front-end es la parte visual de todo sistema, es donde cada usuario interactúa con nuestros datos. A continuación una lista de cada tipo de interfáz y las tecnologías que utilizamos."}
                        direction={"rigth"} >
                        <ListaDetalle title={"Escritorio"} data={[
                            { title: "Java", img: require("../../img/java.png") },
                            { title: "Python", img: require("../../img/python.png") },
                            { title: "C#", img: require("../../img/c.png") },
                        ]} />
                        <ListaDetalle title={"Pagina Web"} data={[
                            { title: "Html", img: require("../../img/html.png") },
                            { title: "Css", img: require("../../img/css.png") },
                            { title: "JavaScript", img: require("../../img/javascript.png") },
                            { title: "Type-Script", img: require("../../img/typescript.png") },
                            { title: "React", img: require("../../img/react.png") },
                        ]} />
                        <ListaDetalle title={"App Iphone"} data={[
                            { title: "React Native", img: require("../../img/react.png") },
                            { title: "Swift", img: require("../../img/swift.png") },
                        ]} />
                        <ListaDetalle title={"App Android"} data={[
                            { title: "React Native", img: require("../../img/react.png") },
                            { title: "Java", img: require("../../img/java.png") },
                        ]} />
                    </Section>
                    <Section
                        titulo={"Back-End"}
                        detalle={"El Back-end es la parte trasera de nuestro sistema, es donde se encuentran los servidores (más adelanta hablaremos de ellos). El back-end se utiliza para ejecutar acciones como consultas a base de datos, consulta a equipos que estan en el data center. El backend se encarga de consultar, procesar, almacenar información para luego enviar al front-end. A continuación una lista de cada tipo tecnología que utilizamos."}
                        direction={"left"} >
                        <ListaDetalle title={"Lenguajes de programación"} data={[
                            { title: "Java", img: require("../../img/java.png") },
                            { title: "Python", img: require("../../img/python.png") },
                            { title: "JavaScript", img: require("../../img/javascript.png") },
                            { title: "C#", img: require("../../img/c.png") },

                        ]} />
                        <ListaDetalle title={"Bases de datos"} data={[
                            { title: "Oracle", img: require("../../img/oracle.png") },
                            { title: "Postgres", img: require("../../img/postgres.png") },
                            { title: "Sql Server", img: require("../../img/sqlserver.png") },
                            { title: "MySql", img: require("../../img/mysql.png") },

                        ]} />
                        <ListaDetalle title={"Envío de información"} data={[
                            { title: "Json", img: require("../../img/json.png") },
                            { title: "Xml", img: require("../../img/xml.png") },

                        ]} />
                    </Section>
                    <Section
                        titulo={"Servidores"}
                        detalle={"Seguramente has escuchado mucho de servidores aquí, servidores allá, etc. Ahora te explicaré a detalle lo que son los servidores. Un servidor no es mas que una pc que brinda diferentes servícios, por ejemplo un servidor web, es un servidor que nos brinda el servicio de publicar una página web (ojo, un servidor no necesariamente tiene que estar publicado en internet, tamien puede estar simplemente publicado en tu red local, sin acceso a internet, en este caso solo podrán consumir sus servcios los equipos dentro de la red local)."}
                        direction={"rigth"} />
                    <Section
                        titulo={"Sistema Operativo"}
                        detalle={"Hay mucho, muchísimo diría yo, que hablar de sistemas operativos, te recomiendo que leas la historia de linux, en resumen Linux lidera el mercado de Sistemas operativos para servidores mientras que windows el mercado de Sistemas operativos personales y de oficína. Eso no quiere decir que no exístan servidores windows. Microsofts tiene su propia linea de Sistemas operativos para servidores con Windows Server. La era de la Web 2.0 ha hecho que la búsqueda del SO indicado sea una preocupación general. Mientras que, en los comienzos de Internet, este era un lugar donde la mayoría de los usuarios solo consumían el contenido presentado, en el nuevo milenio es más un depósito para proyectos web de todo tipo, que son creados, desarrollados e implementados por una gran comunidad online. Independientemente de si se trata de la gestión de un blog, del mantenimiento de una página web o de la descarga de una aplicación web, detrás de todos estos proyectos siempre hay un servidor web que es puesto en marcha y administrado gracias a las funciones de un sistema operativo. Sin embargo, antes de decidirte por un sistema operativo para tu servidor, es necesario dejar claro si quieres ocuparte por tus propios medios del entorno de alojamiento o si prefieres dejarlo en manos de un proveedor."}
                        direction={"left"} />
                </ScrollView>
            </View>
        );
    }
}
export default LobyTecnologiasPage;