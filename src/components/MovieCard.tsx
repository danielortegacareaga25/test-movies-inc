import {View, Text, Image, Pressable, StyleSheet, ViewBase} from 'react-native';
import React, {FC, useContext} from 'react';
import {uriImage} from '../utils/image.util';
import {Movie, MovieFavorite} from '../interfaces/movies.interfaces';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../const/colors.const';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';

interface Props {
  movie: Movie | MovieFavorite;
  height?: number;
  width?: number;
}

const MovieCard: FC<Props> = ({movie, height = 460, width = 300}) => {
  const uri = uriImage(movie.poster_path);
  const navigation = useNavigation();

  const {setFavorite, isFavorite, getRateMovie} = useContext(
    FavoritesRatesContext,
  );
  return (
    <View
      style={{
        width,
        height,
        ...styles.container,
      }}>
      <Pressable
        style={styles.imageContainer}
        onPress={() => navigation.navigate('DetailScreen', movie)}>
        <Image source={{uri}} style={styles.image} />
        <View style={styles.containerDescription}>
          <Text style={styles.titleMovie}>{movie.title}</Text>
          <View style={styles.subItemContainer}>
            <Icon name="calendar" size={12} color={'white'} />
            <Text style={styles.releaseDateMovie}>{movie.release_date}</Text>
          </View>
          <View style={styles.subItemContainer}>
            <Icon name="star-outline" size={12} color={'white'} />
            <Text style={styles.averageVoteMovie}>
              {getRateMovie(movie.id, movie.vote_average, movie.vote_count)}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.containerheart}
          onPress={() => {
            setFavorite({
              id: movie.id,
              poster_path: movie.poster_path,
              title: movie.title,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
            });
          }}>
          <Icon
            name={isFavorite(movie.id) ? 'heart' : 'heart-outline'}
            size={40}
            color={'white'}
          />
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerheart: {
    position: 'absolute',
    backgroundColor: COLORS.main,
    width: 50,
    height: 50,
    right: 10,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  container: {
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  imageContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },
  image: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  containerDescription: {
    paddingTop: 5,
    paddingLeft: 10,
    height: '20%',
    backgroundColor: 'black',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: 'center',
  },
  titleMovie: {
    color: 'white',
    fontSize: 20,
  },
  subItemContainer: {
    flexDirection: 'row',
  },
  releaseDateMovie: {
    color: 'white',
    marginLeft: 20,
  },
  averageVoteMovie: {
    color: 'white',
    marginLeft: 20,
  },
});

export default MovieCard;
