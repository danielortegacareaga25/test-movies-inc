import {View, ScrollView, StyleSheet, Pressable, Text} from 'react-native';
import React, {FC, useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMoviesPlaying} from '../hooks/useMoviesPlaying';
import {RootStackParams} from '../routes/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import Loader from '../components/Loader';
import ListMovieCard from '../components/ListMovieCard';
import {COLORS} from '../const/colors.const';
import Icon from 'react-native-vector-icons/Ionicons';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';
import {useEffect} from 'react';
import {useMoviesRecommendations} from '../hooks/useMoviesRecommendations';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

const Home: FC<Props> = ({navigation}) => {
  const {moviesFavorites} = useContext(FavoritesRatesContext);
  const {isLoading, moviesPlaying} = useMoviesPlaying();
  const {moviesRecommended, setIdMovieRoot} = useMoviesRecommendations();

  useEffect(() => {
    if (moviesFavorites.length) {
      setIdMovieRoot(moviesFavorites[0].id);
    } else if (moviesPlaying.length) {
      setIdMovieRoot(moviesPlaying[0].id);
    }
  }, [setIdMovieRoot, moviesFavorites, moviesPlaying]);

  const {top} = useSafeAreaInsets();
  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={{marginTop: top, ...styles.container}}>
        <ListMovieCard movies={moviesPlaying} title="Peliculas reproduciendo" />
        {moviesRecommended.length ? (
          <ListMovieCard
            movies={moviesRecommended}
            title="Peliculas recomendadas"
          />
        ) : (
          <></>
        )}
      </View>
      <Pressable
        style={styles.containerheart}
        onPress={() => {
          navigation.navigate('FavoritesScreen');
        }}>
        <Icon name={'heart'} size={40} color={'white'} />
        <Text style={styles.textFavorites}>Favoritos</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerheart: {
    position: 'absolute',
    backgroundColor: COLORS.main,
    width: 50,
    height: 50,
    right: 10,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textFavorites: {
    fontSize: 10,
    color: COLORS.textColor,
  },
});
export default Home;
