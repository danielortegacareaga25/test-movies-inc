import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/routes/Navigation';
import {FavoritesRatesProvider} from './src/context/FavoritesRatesContext';

const AppState = ({children}: any) => {
  return <FavoritesRatesProvider>{children}</FavoritesRatesProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
