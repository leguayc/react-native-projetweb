import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Movie from '../components/Movie';
import axios from 'axios';
import { APIKey } from '../../App';

export default function SearchMovie () {
    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    
    const searchMovie = () => {
        const apiUrl = "http://www.omdbapi.com/?apikey=" + APIKey + "&s=" + search;
        axios(apiUrl).then(({ data }) => {
            setMovies(data.Search);
        })
    };

    return (
        <View style={styles.container}>
            <TextInput value={search} onChangeText = {setSearch} placeholder="Search movie"/>
            <Button title="Search" onPress={searchMovie}/>
            <ScrollView style={styles.list}>
                {movies && movies.map((item, index) => (
                    <Movie 
                        key={item.imdbID}
                        id={item.imdbID}
                        title={item.Title}
                        imageUrl={item.Poster}
                        _rating=''
                        isRated={false}
                    />
                ))}
            </ScrollView>
            <Button title="Back to list" onPress={
                () => navigation.navigate('MovieList')
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