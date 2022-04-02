import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MovieList from './src/views/MovieList';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import SearchMovie from './src/views/SearchMovie';

const Stack = createNativeStackNavigator();

export default function App () {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name = "MovieList"
          component={MovieList}
          initialParams={{newMovie: null}}
        />
        <Stack.Screen
          name = "SearchMovie"
          component={SearchMovie}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export const APIKey = "540550e1";

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
