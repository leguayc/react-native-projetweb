import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';


export default class AddMovie extends React.Component {
    IMDB = "https://www.imdb.com/title/";
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            summary: '',
            rating: '',
            link: '',
            valid: false
        }
    }

    checkName = (name) => {
        if (name.length < 30)
            this.setState({name}, this.validateForm);
    }

    checkSummary = (summary) => {
        if (summary.length < 240)
            this.setState({summary}, this.validateForm);
    }
    
    checkRating = (rating) => {
        if (+rating >= 0 && +rating <= 5 && rating.length <= 1)
            this.setState({rating}, this.validateForm);
    }

    checkLink = (link) => {
        if (link.length < 30)
            this.setState({link}, this.validateForm);
    }
    
    validateForm = () => {
        if (this.state.rating.length == 1 && this.state.name.length >= 5 && this.state.link.startsWith(this.IMDB) && this.state.summary.length >= 5)
            this.setState({valid: true})
        else {
            this.setState({valid: false})
        }
    }

    addMovie = async () => {
        if(this.state.valid) {
            try {
                let value = await AsyncStorage.getItem('movies');
                value[value.length-1] = {};
                await AsyncStorage.setItem('movies', JSON.stringify(value));
            } catch (error) {
                console.log("Error saving data");
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>Add a movie</Text>
                <View style={styles.inputs}>
                    <TextInput
                        value = {this.state.name}
                        onChangeText = {this.checkName}
                        placeholder="Name"/>
                    <TextInput
                        placeholder="Summary"
                        value = {this.state.summary}
                        onChangeText = {this.checkSummary}/>
                    <TextInput
                        placeholder="Rating"
                        value = {this.state.rating}
                        onChangeText = {this.checkRating}
                        keyboardType="numeric"/>
                    <TextInput
                        placeholder="IMDB Link"
                        value = {this.state.link}
                        onChangeText = {this.checkLink}/>
                </View>
                
                <Button title="Add" onPress={this.addMovie} disabled={!this.state.valid}/>
            </View>
        );
    }
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
    }
});