import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {observer} from 'mobx-react';
import styles from './style';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            onChangeText={text => store.search(text)}
          />
        </View>
        <FlatList
          style={styles.list}
          data={store.speakers}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => store.setSpeaker(item.id)}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text numberOfLines={1}>{item.role}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          keyExtractor={item => item.id}
        />
        {store.speaker && (
          <View style={styles.overlayContainer}>
            <TouchableOpacity
              style={[styles.overlayContainer, styles.backdrop]}
              onPress={() => store.setSpeaker(null)}
            />
            <ScrollView style={styles.overlay}>
              <Text style={styles.title}>{store.speaker.name}</Text>
              <Text style={styles.role} numberOfLines={1}>
                {store.speaker.role}
              </Text>
              <Image source={{uri: store.speaker.img}} style={styles.image} />
              <Text style={styles.description}>
                {store.speaker.description}
              </Text>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default observer(App);
