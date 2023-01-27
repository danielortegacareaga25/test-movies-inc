import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Cast} from '../interfaces/credits.interfaces';
import {uriImage} from '../utils/image.util';
import {COLORS} from '../const/colors.const';

type Props = {
  actor: Cast;
};

const CastCard: FC<Props> = ({actor}) => {
  const uri = uriImage(actor.profile_path || '');

  return (
    <View style={styles.container}>
      {actor.profile_path && <Image source={{uri}} style={styles.actorImage} />}

      <View style={styles.actorInfo}>
        <Text style={styles.actorName}>{actor.name}</Text>
        <Text style={styles.actorCharacter}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: 100,
    borderColor: COLORS.textColor,
    borderWidth: 1,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    paddingRight: 15,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
  actorImage: {
    width: 97,
    height: 80,
  },
  actorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  actorCharacter: {
    fontSize: 10,
    opacity: 0.7,
    color: COLORS.textColor,
  },
});

export default CastCard;
