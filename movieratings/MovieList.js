import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>List of movies</Text>
                <ScrollView>
        
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});