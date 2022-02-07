import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native"

export default function MovieList () {
    const navigation = useNavigation();
    const route = useRoute();
    const element= route.params.newMovie;

    const [movies, setMovies] = useState([]);

    if ( element ) {
        setMovies((state)=>[...state, {id: state.length, ...element}])
        route.params.newMovie = null;
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>List of movies</Text>
            <ScrollView>
                {movies && movies.map((item, index) => (
                    <Text key={item.id}>Title : {item.title}</Text>
                ))}
            </ScrollView>
            <Button title="Add a movie" onPress={
                () => navigation.navigate('AddMovie')
            }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});