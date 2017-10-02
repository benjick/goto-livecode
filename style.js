import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width,
    justifyContent: 'center',
  },
  list: {width},
  // List
  item: {padding: 10, marginLeft: 20},
  itemText: {fontSize: 20, fontWeight: 'bold'},
  divider: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
  // Popup
  overlayContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backdrop: {backgroundColor: 'black', opacity: 0.3},
  overlay: {
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 20,
    padding: 20,
    flex: 1,
    width: width - 150,
    margin: 150,
  },
  // Popup content
  image: {width: 160, height: 160},
  searchContainer: {
    width,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  search: {
    height: 40,
    paddingLeft: 20,
    width: width - 40,
  },
  title: {fontSize: 16, fontWeight: 'bold'},
  role: {fontSize: 12},
  description: {paddingTop: 10},
});

export default styles;
