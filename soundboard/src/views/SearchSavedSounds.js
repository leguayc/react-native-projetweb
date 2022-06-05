import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import {setSample} from '../store/PresetsSlice';
import store from '../store/Store';
import Sample from '../components/Sample';
import { stopAllAudio } from '../helpers/AudioHelper';

export default function SearchSavedSound() {
    const route = useRoute();
    const [sounds, setSounds] = useState(store.getState().sounds.sounds);
    const [filter, setFilter] = useState(null);
    const element = route.params.buttonSample;
    const callBack = route.params.callBack;

    useEffect(() => {
        return () => {
            stopAllAudio();
        }
    }, []);

    const selectSample = (index) => {
        let item = {id : element.id, sample: sounds[index]};
        store.dispatch(setSample(item));
        
        callBack({id: element.id, sample: sounds[index]});
    }

    const changeFilter = (value) => {
        setFilter(value);
    }

    return (
        <View style={styles.container}>
            <Button title="All" onPress={() => {changeFilter(null)}}/>
            <Button title="Only freesound" onPress={() => {changeFilter("freesound")}}/>
            <ScrollView>
                {sounds.map((sample, index) => {
                    if (!filter || filter == sample.origin.toLowerCase()) {
                        return <Sample key={index} sample={sample} selectCallback={() => selectSample(index)} />
                    }
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
