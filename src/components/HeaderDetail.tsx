import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {FC, useContext} from 'react';
import {Movie} from '../interfaces/movies.interfaces';
import {uriImage} from '../utils/image.util';
import {COLORS} from '../const/colors.const';
import Icon from 'react-native-vector-icons/Ionicons';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';

type Props = {
  movie: Movie;
};

const screenHeight = Dimensions.get('screen').height;
const HeaderDetail: FC<Props> = ({movie}) => {
  const uri = uriImage(movie.poster_path);

  const {setFavorite, isFavorite} = useContext(FavoritesRatesContext);
  return (
    <>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
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
            size={60}
            color={'white'}
          />
        </Pressable>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  containerheart: {
    position: 'absolute',
    backgroundColor: COLORS.main,
    width: 80,
    height: 80,
    right: 20,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  subTitle: {color: COLORS.textColor, fontSize: 18, opacity: 0.8},
  title: {
    color: COLORS.textColor,
    fontSize: 20,
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default HeaderDetail;
