import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="red" size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Loader;
