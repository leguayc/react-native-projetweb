import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Movie from '../components/Movie';

export default function MovieList () {
    const navigation = useNavigation();
    const route = useRoute();
    const element= route.params.newMovie;

    const [movies, setMovies] = useState([{title: 'Test', imageUrl: 'https://fr.web.img2.acsta.net/medias/04/97/17/049717_af.jpg', summary: 'Movie test', rating: 4,}]);

    if ( element ) {
        setMovies((state)=>[...state, {id: state.length, ...element}])
        route.params.newMovie = null;
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>List of movies</Text>
            <ScrollView style={styles.list}>
                {movies && movies.map((item, index) => (
                    <Movie 
                        key={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        summary={item.summary}
                        rating={item.rating}
                        IMDBurl={item.link}
                    />
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
    list: {
        width: '100%'
    }
});