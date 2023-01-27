/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import Details from '../screens/Details';
import {COLORS} from '../const/colors.const';
import {Movie} from '../interfaces/movies.interfaces';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
  FavoritesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: COLORS.main,
        },
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="DetailScreen" component={Details} />
      <Stack.Screen name="FavoritesScreen" component={Favorites} />
    </Stack.Navigator>
  );
};

export default Navigation;
