import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import MoviesDetails from '../components/MovieDetails';
import Starts from '../components/Starts';
import HeaderDetail from '../components/HeaderDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../const/colors.const';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const Details: FC<Props> = ({route, navigation}) => {
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
      <Pressable
        style={styles.containerBack}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Icon name={'arrow-back'} size={40} color={'white'} />
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Details;
