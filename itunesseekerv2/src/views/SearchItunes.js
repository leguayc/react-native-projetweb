import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { TrackPreview } from '../components/Track';
import axios from 'axios';
import store, {setCurrentSearch} from '../store/TracksStore';

export default function SearchItunes() {
    const navigation = useNavigation();

    const [search, setSearch] = useState(store.getState().currentSearch);
    const [results, setResults] = useState([]);
    
    const searchItunes = () => {
        const apiUrl = "https://itunes.apple.com/search?entity=song&term=" + search;
        axios(apiUrl).then(({ data }) => {
            console.log(data.results);
            setResults(data.results);
            store.dispatch(setCurrentSearch(search));
        })
    };

    return (
        <View style={styles.container}>
            <TextInput value={search} style={styles.input} onChangeText = {setSearch} placeholder="Search in itunes musics or artists"/>
            <Button title="Search" onPress={searchItunes}/>
            <ScrollView style={styles.list}>
                {results && results.map((item, index) => (
                    <TrackPreview
                        key={item.trackId} 
                        track={item}
                        rating=''
                        isRated={false}
                    >
                    </TrackPreview>
                ))}
            </ScrollView>
            <Button title="See saved tracks" onPress={
                () => navigation.navigate('SavedTrackList')
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
    },
    input : {
        width: '80%'
    }
});