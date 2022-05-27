import { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ButtonSample from '../components/ButtonSample';
import { stopAllAudio } from '../helpers/AudioHelper';
import store from '../store/SampleBoardStore';

export default function Sampler() {
    const [soundpad, setSoundpad] = useState(store.getState().samples);

    store.subscribe(() => {
        setSoundpad([... store.getState().samples])
    })

    return (
        <View style={styles.container}>
            <View style={styles.soundpad}>
                {soundpad.map(pad => {
                    return <ButtonSample key={pad.id} id={pad.id} bgColor={pad.bgColor} sample={pad.sample} />
                })}
            </View>
            <Button title="Stop all" onPress={stopAllAudio} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    soundpad : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems : 'center',
        width: 200
    }
});
