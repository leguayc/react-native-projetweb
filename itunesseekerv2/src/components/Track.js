import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ToastAndroid, TextInput, TouchableOpacity } from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import store, {addTrack} from '../store/TracksStore';

export default function Track () {
    const navigation = useNavigation();
    const route = useRoute();
    const track = route.params.track;
    const _rating = route.params.rating;
    const isRated = route.params.isRated;
    
    const [rating, setRating] = useState(_rating);
    
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(track.previewUrl);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(track.previewUrl);
        } else {
            ToastAndroid.show('Url not supported', ToastAndroid.SHORT);
        }
    };

    const checkRating = (value) => {
        if (value >= 0 && value <= 5 && value.length <= 1) {
            setRating(value);
        }
    }

    const saveItem = async () => {
        if (rating.length == 1 && rating >= 0 && rating <= 5) {
            const item = {
                track: track,
                rating: rating
            };

            store.dispatch(addTrack(item));
            navigation.navigate('SearchItunes');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text>{track.trackName}</Text>
            <Text>Artist : {track.artistName}</Text>
            <Text>Album : {track.collectionName}</Text>
            <Button title="Download preview" onPress={handlePress}></Button>
            <View style={{flexDirection: 'row'}}>
                {isRated ? <Text>{rating}</Text> : <TextInput value={rating} onChangeText ={checkRating} keyboardType="numeric" style={styles.input} placeholder=""/> }
                <Text> / 5</Text>
            </View>
            {!isRated ? <Button title="Rate & Save" onPress={saveItem}></Button> : null }
        </View>
    );
}

export function TrackPreview ({track, rating, isRated}) {
    const navigation = useNavigation();
    
    const handlePress = async () => {
        if (isRated) {
            navigation.navigate('Track', {track: track, rating: rating, isRated: isRated});
        } else {
            let savedTracks = store.getState().tracks;
            let _rating = '';
            let _isRated = false;

            if (savedTracks) {
                for(let i=0; i < savedTracks.length; i++) {
                    if (savedTracks[i].track.trackId == track.trackId) {
                        _isRated = true;
                        _rating = savedTracks[i].rating;
                    }
                }
            }

            navigation.navigate('Track', {track: track, rating: _rating, isRated: _isRated});
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text>{track.artistName} - {track.trackName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    image: {
        height: 100,
        width: 100
    },
    input: {
        width: 10
    }
});