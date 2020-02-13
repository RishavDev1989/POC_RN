import React from 'react';
import {createAppContainer} from 'react-navigation';
import GeneratePins from './features/generatePins';
import SavedPinsList from './features/savedPinsList';
import {createStackNavigator} from 'react-navigation-stack';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Generate: {
    screen: GeneratePins,
  },
  Saved: {
    screen: SavedPinsList,
  },
});

const AppContainer = createAppContainer(AppNavigator);
