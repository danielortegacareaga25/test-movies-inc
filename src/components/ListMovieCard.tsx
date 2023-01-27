import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {FC} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Movie, MovieFavorite} from '../interfaces/movies.interfaces';
import MovieCard from './MovieCard';

type Props = {
  movies: Movie[] | MovieFavorite[];
  title: string;
};

const {width: windowWidth} = Dimensions.get('window');
const ListMovieCard: FC<Props> = ({movies, title}) => {
  return (
    <>
      <Text style={styles.titleMain}>{title}</Text>
      <View style={{height: 440}}>
        <Carousel
          data={movies}
          renderItem={({item}: any) => <MovieCard movie={item} />}
          sliderWidth={windowWidth}
          itemWidth={300}
          inactiveSlideOpacity={0.9}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleMain: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default ListMovieCard;
