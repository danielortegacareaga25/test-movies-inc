import {View, Text, StyleSheet} from 'react-native';
import React, {FC, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieFull} from '../interfaces/movies.interfaces';
import {Cast} from '../interfaces/credits.interfaces';
import {COLORS} from '../const/colors.const';
import ListCast from './ListCast';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

const MoviesDetails: FC<Props> = ({movieFull, cast}) => {
  const {getRateMovie} = useContext(FavoritesRatesContext);
  return (
    <View style={styles.container}>
      <Text style={styles.age}>Año: {movieFull.release_date.slice(0, 4)}</Text>
      <View style={styles.containerDescription}>
        <Icon name="star-outline" size={16} color={COLORS.textColor} />
        <Text style={styles.averageText}>
          {getRateMovie(
            movieFull.id,
            movieFull.vote_average,
            movieFull.vote_count,
          )}
        </Text>
        <Text style={styles.genresText}>
          Generos: {movieFull.genres.map(g => g.name).join(', ')}
        </Text>
      </View>
      <Text style={styles.overviewText}>Sinopsis: {movieFull.overview}</Text>

      <View style={styles.containerCast}>
        <Text style={styles.castTitleText}>Actores</Text>
        <ListCast cast={cast} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  containerDescription: {
    flexDirection: 'row',
  },
  age: {
    color: COLORS.textColor,
  },
  averageText: {
    color: COLORS.textColor,
    marginLeft: 4,
  },
  genresText: {
    color: COLORS.textColor,
    marginLeft: 10,
  },
  overviewText: {
    color: COLORS.textColor,
    textAlign: 'justify',
  },
  containerCast: {
    marginTop: 10,
    marginBottom: 20,
    height: 200,
  },
  castTitleText: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
});

export default MoviesDetails;
