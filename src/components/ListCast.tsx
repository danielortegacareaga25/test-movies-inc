import {View, Text, FlatList} from 'react-native';
import React, {FC} from 'react';
import {Cast} from '../interfaces/credits.interfaces';
import CastCard from './CastCard';

interface Props {
  cast: Cast[];
}

const ListCast: FC<Props> = ({cast}) => {
  return (
    <FlatList
      data={cast}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={({item}) => <CastCard actor={item} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginTop: 10, height: 70}}
      ItemSeparatorComponent={<View style={{marginHorizontal: 5}} />}
    />
  );
};

export default ListCast;
