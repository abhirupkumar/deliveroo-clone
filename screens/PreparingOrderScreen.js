import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppState, SafeAreaView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/)
            ) {
                setTimeout(() => {
                    navigation.navigate('Delivery')
                }, 1000)
            }


        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 4000)
    }, [])

    return (
        <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
            <Animatable.Image
                source={require('../assets/orderLoding.gif')}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg px-4 my-10 text-white font-bold text-center">
                Waiting for Restaurant to accept your order
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen