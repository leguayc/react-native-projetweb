import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ToastAndroid, Image, TextInput } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';
import { APIKey } from '../../App';

export default function Movie ({id, title, imageUrl, _rating, isRated}) {
    const navigation = useNavigation();
    
    const [image, setImage] = useState({uri: imageUrl});
    const [plot, setPlot] = useState('');
    const [rating, setRating] = useState(_rating);
    const [imdbUrl, setImdbUrl] = useState("https://www.imdb.com/title/" + id);

    const setDefautImage = () => {
        setImage({uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg'})
    };
    
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(imdbUrl);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(imdbUrl);
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
                id: id,
                title: title,
                imageUrl: imageUrl,
                rating: rating
            };
    
            navigation.navigate('MovieList', {newMovie: item});
        }
    };

    if (plot == '' && isRated) {
        const apiUrl = "http://www.omdbapi.com/?apikey=" + APIKey + "&plot=full&i=" + id;
        axios(apiUrl).then(({ data }) => {
            setPlot(data.Plot);
        })
    }
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
                onError={setDefautImage}
            />
            <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 10}}>{title}</Text>
                {isRated ? <Text>{rating}</Text> : <TextInput value={rating} onChangeText ={checkRating} keyboardType="numeric" style={styles.input} placeholder=""/> }
                <Text> / 5</Text>
            </View>
            {isRated ? <Text>{plot}</Text> : null }
            <Button title="Go to IMDB to see more" onPress={handlePress}></Button>
            {!isRated ? <Button title="Save" onPress={saveItem}></Button> : null }
        </View>
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