import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  kotakjudul: {
    backgroundColor: 'lightblue',
    alignSelf: 'stretch',
  },
  judul: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    padding: 10,
  },
  kotakitem: {justifyContent: 'space-between', paddingTop: 0, padding: 12},
  teks: {color: 'black', marginTop: 18, marginBottom: 6},
  boxteks: {
    color: 'black',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    paddingStart: 5,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  tekseror: {
    color: 'red',
  },
  dropdown: {
    borderColor: '#e4e4e4',
    backgroundColor: '#fafafa',
    marginVertical: 10,
  },
  dropdownPlaceholder: {
    color: '#c7c7c8',
  },
  button: {
    width: '100%',
    backgroundColor: '#517CFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
  },
  teksbutton: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default style;
