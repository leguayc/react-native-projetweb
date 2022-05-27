import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from 'react';
import Sample from '../components/Sample';

export default function EditSample() {
    const route = useRoute();
    const navigation = useNavigation();
    const [element, setElement] = useState(route.params.buttonSample);

    const searchFreesound = () => {
        navigation.navigate('SearchFreesound', {buttonSample: element, callBack: setElement});
    }

    return (
        <View style={styles.container}>
            <Text>Current sound : </Text>
            <Sample sample={element.sample} />
            <Button title="Search Freesound" onPress={searchFreesound} />
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
