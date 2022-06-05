import { StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { clearUnusedAudio, playAudio } from '../helpers/AudioHelper';
import { useState } from 'react';

export default function ButtonSample({id, bgColor, sample, ...props}) {
    const navigation = useNavigation();
    const [isPlaying, setIsPlaying] = useState(false);

    let timerId;
    const style = {
        width: 50,
        height: 50,
        margin: 5,
        backgroundColor: bgColor && sample ? bgColor : "#fff",
        borderWidth: isPlaying ? 2 : 0,
        borderColor: "red"
    };

    const onPressIn = () => {
        timerId = setTimeout(() => {
            timerId = null;
            
            let item = {id: id, sample: sample};
            navigation.navigate('EditSample', {buttonSample: item});
        }, 300);
    };

    const onPressOut = () => {
        if (timerId != null)
        {
            clearTimeout(timerId);
            timerId = null;
            
            if (sample)
            {
                playAudio(id, sample.previews["preview-hq-mp3"], onAudioEnd);
                setIsPlaying(true);
            }
        }
    };

    const onAudioEnd = () => {
        setIsPlaying(false);
    }

    return (
        <TouchableOpacity style={style} onPressIn={onPressIn} onPressOut={onPressOut}>
        </TouchableOpacity>
    );
}
