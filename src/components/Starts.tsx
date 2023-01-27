import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../const/colors.const';
import {useState, useEffect} from 'react';
import {FavoritesRatesContext} from '../context/FavoritesRatesContext';

type Props = {
  movieId: number;
};

const starsArr = new Array(10).fill(null);

const Starts: FC<Props> = ({movieId}) => {
  const {getRateMovie, setRateMovie} = useContext(FavoritesRatesContext);
  const [rate, setRate] = useState(0);
  const handlerRate = (idx: number) => {
    setRate(idx + 1);
    setRateMovie(movieId, idx + 1);
  };
  useEffect(() => {
    setRate(getRateMovie(movieId));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.reviewText}>Tu opinión</Text>
      <View style={styles.containerStars}>
        {starsArr.map((_, idx) => (
          <Pressable onPress={() => handlerRate(idx)}>
            <Icon
              name={idx < rate ? 'star' : 'star-outline'}
              size={50}
              color={COLORS.textColor}
              style={styles.startIcon}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  containerStars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textColor,
  },
  startIcon: {
    marginHorizontal: 5,
  },
});
export default Starts;
