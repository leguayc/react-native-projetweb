import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ToastAndroid, Image } from 'react-native';

export default function Movie ({title, imageUrl, summary, rating, IMDBurl}) {
    const [image, setImage] = useState({uri: imageUrl});

    const setDefautImage = () => {
        setImage({uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg'})
    };
    
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(IMDBurl);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(IMDBurl);
        } else {
            ToastAndroid.show('Url not supported', ToastAndroid.SHORT);
        }
    };
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
                onError={setDefautImage}
            />
            <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 10}}>{title}</Text>
                <Text>{rating} / 5</Text>
            </View>
            <Text>{summary}</Text>
            <Button title="IMDB" onPress={handlePress}></Button>
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
    }
});