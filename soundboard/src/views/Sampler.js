import { useState } from 'react';
import { StyleSheet, View, Button, Picker } from 'react-native';
import ButtonSample from '../components/ButtonSample';
import { stopAllAudio } from '../helpers/AudioHelper';
import store, { setCurrentPreset, addPreset, removePreset } from '../store/SampleBoardStore';

export default function Sampler() {
    const [presets, setPresets] = useState(store.getState().presets);
    const [presetIndex, setPresetIndex] = useState(store.getState().currentPreset);
    const [soundpad, setSoundpad] = useState(store.getState().presets[store.getState().currentPreset]);

    store.subscribe(() => {
        let storeState = store.getState();
        setPresetIndex(storeState.currentPreset);
        setPresets([... storeState.presets]);
        setSoundpad([... storeState.presets[storeState.currentPreset]]);
    });

    const changePreset = (value) => {
        if (value == "add") {
            store.dispatch(addPreset());
            store.dispatch(setCurrentPreset(presets.length));
        } else {
            store.dispatch(setCurrentPreset(value));
        }

        stopAllAudio();
    };

    const removeCurrentPreset = () => {
        store.dispatch(removePreset(presetIndex));
    };

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    selectedValue={presetIndex}
                    onValueChange={changePreset}
                >
                    {presets.map((preset, index) => {
                        return <Picker.Item key={index} label={"Preset " + index} value={index} />
                    })}
                    <Picker.Item label="New preset" value="add" />
                </Picker>
                <Button title="Remove current preset" onPress={removeCurrentPreset} />
            </View>
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
