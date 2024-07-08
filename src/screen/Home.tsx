import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ListItem } from '../components/ListItem';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchPosts } from '../store/slice';
import FloatingButton from '../components/FloatButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/HeadLoading';

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const viewableItems = useSharedValue<ViewToken[]>([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


    return (
      <SafeAreaView style={styles.container}>
        {loading && <Loading />}
        {!loading && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 20 }}
            onViewableItemsChanged={({ viewableItems: vItems }) => {
              viewableItems.value = vItems;
            }}
            renderItem={({ item }) => {
              return(
                <View> 
                  <ListItem item={item} viewableItems={viewableItems} />
                  </View>)
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
        <FloatingButton />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});