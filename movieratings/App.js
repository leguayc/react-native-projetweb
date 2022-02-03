import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  toggleShow = () => {
    this.setState(prevState => ({showForm: !prevState.showForm}));
  }

  render() {
    if (this.state.showForm)
    {
      return (
        <View style={styles.container}>
          <MovieList />
          <TouchableOpacity
            onPress={this.toggleShow}
            style={styles.roundButton}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 30}}>+</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <AddMovie />
          <TouchableOpacity
            onPress={this.toggleShow}
            style={styles.bottomButton}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 30}}>Return</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    width: 50,
    height: 50,
    position: 'fixed',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    color: 'white',
    backgroundColor: '#27B197',
    flex: 1,
  },
  bottomButton: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: 10,
    color: 'white',
    backgroundColor: '#27B197',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
