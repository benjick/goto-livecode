import React from 'react';
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

const ListItem = props => (
  <TouchableOpacity style={styles.item} onPress={props.onPressItem}>
    <Text style={styles.itemText}>{props.name}</Text>
    <Text numberOfLines={1}>{props.role}</Text>
  </TouchableOpacity>
);

export default class App extends React.Component {
  state = {
    speakers: [],
    loading: false,
    search: '',
    speaker: null,
  };

  componentDidMount() {
    this.loadSpeakers();
  }

  get speakers() {
    const {speakers, search} = this.state;
    return speakers
      .filter(speaker =>
        speaker.name.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 30);
  }

  set speaker(id) {
    this.setState({speaker: id});
  }

  get speaker() {
    const {speakers, speaker} = this.state;
    return speakers.find(s => s.id === speaker);
  }

  loadSpeakers() {
    this.setState({loading: true}, async () => {
      const result = await fetch('http://127.0.0.1:8080/speakers.json');
      const speakers = await result.json();
      this.setState({loading: false, speakers});
    });
  }

  render() {
    if (this.state.loading) {
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
            onChangeText={search => this.setState({search})}
            value={this.state.search}
          />
        </View>
        <FlatList
          style={styles.list}
          data={this.speakers}
          extraData={this.state}
          renderItem={({item}) => (
            <ListItem {...item} onPressItem={() => (this.speaker = item.id)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          keyExtractor={item => item.name}
        />
        {this.speaker && (
          <View style={styles.overlayContainer}>
            <TouchableOpacity
              style={[styles.backdrop, styles.overlayContainer]}
              onPress={() => (this.speaker = null)}
            />
            <View style={styles.overlay}>
              <ScrollView>
                <Text style={styles.title}>{this.speaker.name}</Text>
                <Text style={styles.role} numberOfLines={1}>
                  {this.speaker.role}
                </Text>
                {this.speaker.img ? (
                  <Image
                    style={styles.image}
                    source={{uri: this.speaker.img}}
                  />
                ) : null}
                <Text style={styles.description}>
                  {this.speaker.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    );
  }
}
