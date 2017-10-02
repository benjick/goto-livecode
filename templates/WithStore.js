import React from 'react';
import {observer} from 'mobx-react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './style';
import store from './store';

class App extends React.Component {
  render() {
    if (store.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search for speakers"
            onChangeText={store.search}
            value={store.searchTerm}
          />
        </View>
        <FlatList
          style={styles.list}
          data={store.speakers}
          extraData={{searchTerm: store.searchTerm}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => store.setSpeaker(item.id)}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text numberOfLines={1}>{item.role}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          keyExtractor={item => item.name}
        />
        {store.speaker && (
          <View style={styles.overlayContainer}>
            <TouchableOpacity
              style={[styles.backdrop, styles.overlayContainer]}
              onPress={() => store.setSpeaker(null)}
            />
            <View style={styles.overlay}>
              <ScrollView>
                <Text style={styles.title}>{store.speaker.name}</Text>
                <Text style={styles.role} numberOfLines={1}>
                  {store.speaker.role}
                </Text>
                {store.speaker.img ? (
                  <Image
                    style={styles.image}
                    source={{uri: store.speaker.img}}
                  />
                ) : null}
                <Text style={styles.description}>
                  {store.speaker.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default observer(App);
