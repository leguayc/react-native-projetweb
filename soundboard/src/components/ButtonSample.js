import { StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { clearUnusedAudio, playAudio } from '../helpers/AudioHelper';

export default function ButtonSample({id, bgColor, sample, ...props}) {
    const navigation = useNavigation();
    let timerId;
    const style = {
        width: 50,
        height: 50,
        margin: 5,
        backgroundColor: bgColor && sample ? bgColor : "#fff"
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
                playAudio(id, sample.previews["preview-hq-mp3"]);
            }
        }
    };

    return (
        <TouchableOpacity style={style} onPressIn={onPressIn} onPressOut={onPressOut}>
        </TouchableOpacity>
    );
}
