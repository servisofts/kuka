import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  Easing,
  useColorScheme,
} from 'react-native';

import * as SSSocket from './SSSocket'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer from './Reducer';
import SSNavigation from './SSNavigation';

import AppParams from './Params/index.json'
import BarraDeDesconeccion from './SSSocket/BarraDeDesconeccion';
import DropDown from './Component/DropDown';
import SSRolesPermisos from './SSRolesPermisos';
import { SComponentClass } from './SComponent';
const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);

SSSocket.init(store);



const isNative = Platform.OS !== 'web';

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.scrollView} behavior={{ padding: 0, }}>
        <StatusBar barStyle={'light-content'} backgroundColor={"#000"} />
        <BarraDeDesconeccion socketName={AppParams.socket.name} color={"#000000"} visible={false} />
        <SSRolesPermisos />
          <SComponentClass >
            <SSNavigation />
          </SComponentClass>
      </SafeAreaView>
    </Provider>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
    maxHeight: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: '#1B95E0',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
