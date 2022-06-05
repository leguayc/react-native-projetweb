import { StatusBar } from 'expo-status-bar';
import Sampler from './src/views/Sampler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import EditSample from './src/views/EditSample';
import SearchFreesound from './src/views/SearchFreesound';
import SearchSavedSound from './src/views/SearchSavedSounds';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/Store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator >
                        <Stack.Screen
                            name = "Sampler"
                            component={Sampler}
                        />
                        <Stack.Screen
                            name = "EditSample"
                            component={EditSample}
                            initialParams={{buttonPad: {}}}
                        />
                        <Stack.Screen
                            name = "SearchFreesound"
                            component={SearchFreesound}
                            initialParams={{buttonPad: {}, callBack: () => {}}}
                        />
                        <Stack.Screen
                            name = "SearchSavedSound"
                            component={SearchSavedSound}
                            initialParams={{buttonPad: {}, callBack: () => {}}}
                        />
                    </Stack.Navigator>
                    <StatusBar style="auto" />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export const APIKey = "GmSYZWpPJsMbab157XtDW0QdbzHzADAjtazGMqXW";