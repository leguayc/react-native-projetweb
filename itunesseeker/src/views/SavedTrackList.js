import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import { TrackPreview } from '../components/Track';
import { getData, SavedTracksKey } from '../../AsyncStorageHelper';

export default function SavedTrackList () {
    const navigation = useNavigation();
    const route = useRoute();
    const hasSavedNewTrack = route.params.hasSavedNewTrack;

    const [tracks, setTracks] = useState([]);

    if (tracks.length == 0) {
        getData(SavedTracksKey).then( (data) => {
            if (data) {
                setTracks(data.allTracks);
            }
        });
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>List of movies that you rated</Text>
            <ScrollView style={styles.list}>
                {tracks && tracks.map((item, index) => (
                    <TrackPreview 
                        key={item.track.trackId}
                        track={item.track}
                        rating={item.rating}
                        isRated={true}
                    />
                ))}
            </ScrollView>
            <Button title="Search on itunes" onPress={
                () => navigation.navigate('SearchItunes')
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