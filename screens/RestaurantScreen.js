import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from '../utils/SafeViewAndroid'
import { ChevronRightIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import { useDispatch } from 'react-redux'
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { setRestaurant } from '../features/restaurantSlice';

export default function RestaurantScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const truncate = (string, n) =>
        string?.length > n ? string.substr(0, n - 1) + "..." : string;

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        } } = useRoute()

    useEffect(() => {
        dispatch(
            setRestaurant({
                id,
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes,
                long,
                lat
            })
        )
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView style={SafeViewAndroid.AndroidSafeArea} contentContainerStyle={{ paddingBottom: 30 }} >
                <View className="relative">
                    <Image source={{
                        uri: urlFor(imgUrl).url(),
                    }}
                        className="w-full h-56 bg-gray-300 p-4" />
                </View>
                <TouchableOpacity onPress={navigation.goBack} className="absolute top-6 left-5 p-2 bg-gray-50 rounded-full">
                    <ArrowLeftIcon size={20} color="#00CCBB" />
                </TouchableOpacity>

                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-3" >
                            <View className="flex-row items-center space-x-2">
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500">{rating} </Text> - {genre}</Text>
                            </View>
                            <View className="flex-row flex-wrap items-center space-x-1">
                                <MapPinIcon color='gray' opacity={0.4} size={22} />
                                <Text className="text-xs text-gray-500">Nearby - {truncate(address, 24)}</Text>
                            </View>

                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 bordery border-gray-300 ">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="pb-32">
                    <Text className="px-4 pt-6 pb-3 font-bold text-xl">
                        Menu
                    </Text>

                    {dishes.map(dish => {
                        return <DishRow key={dish._id} id={dish._id} name={dish.name} desc={dish.short_description} price={dish.price} image={dish.image} />
                    })}
                </View>
            </ScrollView>
        </>
    )
}