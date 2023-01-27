import {View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import MoviesDetails from '../components/MovieDetails';
import Starts from '../components/Starts';
import HeaderDetail from '../components/HeaderDetail';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const Details: FC<Props> = ({route}) => {
  const movie = route.params;

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);
  return (
    <ScrollView>
      <HeaderDetail movie={movie} />
      {isLoading ? (
        <ActivityIndicator size={30} color={'gray'} />
      ) : (
        <View>
          <MoviesDetails movieFull={movieFull!} cast={cast} />
          <Starts movieId={movieFull?.id!} />
        </View>
      )}
    </ScrollView>
  );
};

export default Details;
