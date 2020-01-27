import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducer/rootReducer'
const appStore = createStore(rootReducer)
const AppObject = () => {
      return (
        <Provider store={appStore}>
              <App/>
        </Provider>
      );
    };
    AppRegistry.registerComponent(appName, () => AppObject);
