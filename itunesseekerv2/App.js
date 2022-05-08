import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SavedTrackList from './src/views/SavedTrackList';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import SearchItunes from './src/views/SearchItunes';
import Track from './src/components/Track';

const Stack = createNativeStackNavigator();

export default function App () {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name = "SearchItunes"
          component={SearchItunes}
        />
        <Stack.Screen
          name = "SavedTrackList"
          component={SavedTrackList}
          initialParams={{newTrack: null}}
        />
        <Stack.Screen
          name = "Track"
          component={Track}
          initialParams={{hasSavedNewTrack: false}}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
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
