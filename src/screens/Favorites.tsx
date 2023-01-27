import {View, ScrollView, StyleSheet, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListMovieCard from '../components/ListMovieCard';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';
import {COLORS} from '../const/colors.const';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/Navigation';
import {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'FavoritesScreen'> {}

const Favorites: FC<Props> = ({navigation}) => {
  const {moviesFavorites} = useContext(FavoritesRatesContext);
  return (
    <View style={styles.container}>
      <ListMovieCard movies={moviesFavorites} title="Favoritos" />
      <Pressable
        style={styles.containerBack}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Icon name={'arrow-back'} size={40} color={'white'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBack: {
    position: 'absolute',
    backgroundColor: COLORS.main,
    width: 50,
    height: 50,
    left: 10,
    top: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default Favorites;
