import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice'
import { useSelector, useDispatch } from 'react-redux'
import { urlFor } from '../sanity'
import CurrencyFormat from 'react-currency-format'
import { XCircleIcon } from 'react-native-heroicons/solid'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import {
    removeFromBasket,
    selectBasketItems,
    selectBasketTotal
} from '../features/basketSlice'

export default function BasketScreen() {

    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const deliveryFee = basketTotal > 500 ? 0 : 70

    const dispatch = useDispatch()
    const [groupedItems, setGroupedItems] = useState([])

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            ; (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})

        setGroupedItems(groupedItems)
        //   initializePaymentSheet()
    }, [items])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Cart</Text>
                        <Text className="text-center text-gray-400">
                            {restaurant.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{ uri: 'https://links.papareact.com/wru' }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Delivery in 40-45 min</Text>
                    <Text className="text-[#00CCBB]">Deliveroo</Text>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupedItems).map(([key, items]) => (
                        <View
                            key={key}
                            className="flex-row items-center space-x-3 bg-white py-2 px-5"
                        >
                            <Text className="text-[#00CCBB]">{items.length} x</Text>
                            <Image
                                source={{ uri: urlFor(items[0]?.image).url() }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>

                            <CurrencyFormat
                                value={items[0].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'???'}
                                renderText={value => (
                                    <Text className="text-gray-600">{value}</Text>
                                )}
                            />

                            <TouchableOpacity>
                                <Text
                                    className="text-[#00CCBB] text-xs"
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                >
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className="p-5 bg-white space-y-4 mt-2">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <CurrencyFormat
                            value={basketTotal}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'???'}
                            renderText={value => (
                                <Text className="text-gray-400">{value}</Text>
                            )}
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <CurrencyFormat
                            value={deliveryFee}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'???'}
                            renderText={value => (
                                <Text className="text-gray-400">{value}</Text>
                            )}
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <Text>Order Total</Text>
                        <CurrencyFormat
                            value={basketTotal + deliveryFee}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'???'}
                            renderText={value => (
                                <Text className="font-extrabold">{value}</Text>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PreparingOrderScreen")}
                        // disabled={!loading}
                        className="rounded-lg p-4 bg-[#00CCBB]"
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}