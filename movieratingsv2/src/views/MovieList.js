import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Movie from '../components/Movie';

export default function MovieList () {
    const navigation = useNavigation();
    const route = useRoute();
    const element= route.params.newMovie;

    const [movies, setMovies] = useState([]);

    if ( element ) {
        setMovies((state)=>[...state, element])
        route.params.newMovie = null;
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>List of movies that you rated</Text>
            <ScrollView style={styles.list}>
                {movies && movies.map((item, index) => (
                    <Movie 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        _rating={item.rating}
                        isRated={true}
                    />
                ))}
            </ScrollView>
            <Button title="Search movie" onPress={
                () => navigation.navigate('SearchMovie')
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