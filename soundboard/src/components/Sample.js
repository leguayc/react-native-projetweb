import { Button, Text, View, StyleSheet } from "react-native";
import { playAudio } from "../helpers/AudioHelper";

const MAX_DESCRIPTION_LENGTH = 150;

export default function Sample({sample, selectCallback, onPlay, onStop, ...props}) {
    const play = () => {
        // We play this sounds on channel 10 because it's unused by the soundboard (channel from 0 to 9)
        playAudio(10, sample.previews["preview-hq-mp3"]);
        
        if (onPlay)
        {
            onPlay();
        }
    };

    return (
        <View>
            {sample ?
                <View style={styles.container}>
                    <Text>Title : {sample.name}</Text>
                    <Text>Description : {sample.description.length < MAX_DESCRIPTION_LENGTH ? sample.description : sample.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'}</Text>
                    {sample.origin &&
                        <Text>Origin : {sample.origin}</Text>
                    }
                    <Button title="Play" onPress={play}/>
                    {selectCallback &&
                        <Button title="Select" onPress={selectCallback}/>
                    }
                </View>
                : <Text>None</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        width: 300,
        padding: 10,
        border: 2
    },
});