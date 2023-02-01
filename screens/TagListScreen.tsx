import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from '../components/Title';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Tag } from '../types/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetTags } from '../hooks/useGetTags';
import { TagCard } from '../components/TagCard';

type Item = {
  item: Omit<Tag, 'createdAt'>;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TagList'>;
};

export const TagListScreen: VFC<Props> = (navigation) => {
  const { tags, getErr, isLoading } = useGetTags();
  const tagsKEyExtractor = (item: Omit<Tag, 'createdAt'>) => item.id;
  const tagsRenderItem = ({ item }: Item) => (
    <TagCard id={item.id} name={item.name} />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={tw('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color="gray" />
        {getErr !== '' && (
          <Text style={tw('text-red-500 my-3 font-semibold')}>{getErr}</Text>
        )}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100 items-center')}>
      <Title first="Tag" last="List"></Title>
      <TouchableOpacity
        style={tw('mt-2')}
        onPress={() => navigation.navigation.navigate('CreateTag')}
      >
        <MaterialCommunityIcons
          name="tag-plus"
          size={40}
          color="#5f9ea0"
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <Text style={tw('text-gray-700 mt-2 mb-5')}>Add tag</Text>
      <View style={[tw('flex-1 m-2')]}>
        <FlatList
          data={tags}
          keyExtractor={tagsKEyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={tagsRenderItem}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};
