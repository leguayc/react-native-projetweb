import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddMovie () {
    const IMDB = "https://www.imdb.com/title/";
    
    // All parameters for the movie
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [summary, setSummary] = useState('');
    const [rating, setRating] = useState('');
    const [link, setLink] = useState('');

    // All valid check for the form
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isImageUrlValid, setIsImageUrlValid] = useState(false);
    const [isSummaryValid, setIsSummaryValid] = useState(false);
    const [isRatingValid, setIsRatingValid] = useState(false);
    const [isLinkValid, setIsLinkValid] = useState(false);
    const [isMovieValid, setIsMovieValid] = useState(false);

    const [showErrors, setShowErrors] = useState(false);

    const navigation = useNavigation();

    const checkTitle = (_title) => {
        if (_title.length < 30)
            setTitle(_title);
    };

    const checkImageUrl = (_imageUrl) => {
        if (_imageUrl.length < 50)
            setImageUrl(_imageUrl);
    };

    const checkSummary = (_summary) => {
        if (_summary.length < 240)
            setSummary(_summary);
    };
    
    const checkRating = (_rating) => {
        if (+_rating >= 0 && +_rating <= 5 && _rating.length <= 1)
            setRating(_rating);
    };

    const checkLink = (_link) => {
        if (_link.length < 50)
            setLink(_link);
    };
        
    const validateForm = () => {
        let titleValid = (title.length >= 5);
        setIsTitleValid(titleValid)

        let ratingValid = (rating.length == 1);
        setIsRatingValid(ratingValid);

        let imageUrlValid = ( (imageUrl.startsWith('https://') || imageUrl.startsWith('http://')) && (imageUrl.endsWith('.png') || imageUrl.endsWith('.jpg')));
        setIsImageUrlValid(imageUrlValid);

        let linkValid = (link.startsWith(IMDB));
        setIsLinkValid(linkValid);

        let summaryValid = (summary.length > 0);
        setIsSummaryValid(summaryValid);
        
        let movieValid = (
            titleValid
            && imageUrlValid 
            && ratingValid 
            && summaryValid 
            && linkValid
        );

        setIsMovieValid(movieValid);

        return movieValid;
    };

    const addMovie = () => {
        if(validateForm()) {
            const item = {
                title: title,
                imageUrl: imageUrl,
                rating: rating,
                summary: summary,
                link: link
            };

            navigation.navigate('MovieList', {newMovie: item});

            setShowErrors(false);
        } else {
            setShowErrors(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>Add a movie</Text>
            <View style={styles.inputs}>
                <TextInput
                    value = {title}
                    onChangeText = {checkTitle}
                    placeholder="Title"/>
                {(!isTitleValid && showErrors)?(<Text style={styles.errorMsg}>Title of movie is at least 5 characters</Text>):(<></>)}
                <TextInput
                    value = {imageUrl}
                    onChangeText = {checkImageUrl}
                    placeholder="Image url"/>
                {(!isImageUrlValid && showErrors)?(<Text style={styles.errorMsg}>Image url needs to be a .jpg or a .png</Text>):(<></>)}
                <TextInput
                    placeholder="Summary"
                    value = {summary}
                    onChangeText = {checkSummary}/>
                {(!isSummaryValid && showErrors)?(<Text style={styles.errorMsg}>Summary is required</Text>):(<></>)}
                <TextInput
                    placeholder="Rating"
                    value = {rating}
                    onChangeText = {checkRating}
                    keyboardType="numeric"/>
                {(!isRatingValid && showErrors)?(<Text style={styles.errorMsg}>Rating is between 0 and 5</Text>):(<></>)}
                <TextInput
                    placeholder="IMDB Link"
                    value = {link}
                    onChangeText = {checkLink}/>
                {(!isLinkValid && showErrors)?(<Text style={styles.errorMsg}>IMDB link needs to be valid</Text>):(<></>)}
            </View>
            
            <Button title="Add" onPress={addMovie} />
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

    inputs: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },

    errorMsg : {
        color: 'red',
        fontSize: 10
    }
});