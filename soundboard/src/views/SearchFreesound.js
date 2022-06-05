import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { APIKey } from '../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import store, {setSample} from '../store/SampleBoardStore';
import Sample from '../components/Sample';
import { stopAllAudio } from '../helpers/AudioHelper';

export default function SearchFreesound() {
    const route = useRoute();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const element = route.params.buttonSample;
    const callBack = route.params.callBack;

    const searchAPI = () => {
        const apiUrl = "https://freesound.org/apiv2/search/text/?token=" + APIKey + "&fields=id,name,description,previews,duration&query=" + search;
        
        axios(apiUrl).then(({ data }) => {
            setResults(data.results);
        })
    }

    const saveSample = (index) => {
        let item = {id : element.id, sample: results[index]};
        store.dispatch(setSample(item));
        callBack({id: element.id, sample: results[index]});
    }

    const onInputFreesoundChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        return () => {
            stopAllAudio();
        }
    }, []);

    return (
        <View style={styles.container}>
            <TextInput placeholder='Search...' onChange={onInputFreesoundChange} />
            <Button title="Search Freesound" onPress={searchAPI} />
            <ScrollView>
                {results.map((sample, index) => {
                    return <Sample key={index} sample={sample} selectCallback={() => saveSample(index)} />
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
});