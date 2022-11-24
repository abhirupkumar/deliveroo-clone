import { View, Text, Image, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from '../utils/SafeViewAndroid'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => { //for loading UI
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => { //for loading page
    sanityClient.fetch(
      `
  *[_type == "featured"] {
    name,
    short_description,
    _id,
  }
  `
    ).then((data) => {
      setFeaturedCategories(data)
    })
    
  }, [])
  

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white pt-2 h-full">
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image source={{
            uri: 'https://links.papareact.com/wru'
          }} className='h-7 w-7 bg-gray-300 pb-4 rounded-full'/>

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 mx-4 pb-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center">
            <MagnifyingGlassIcon size={20} color="gray"/>
            <TextInput
              placeholder="Restaurants and Cuisines"
              keyboardType="default"
              className="ml-1"
            />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        {/* Body */}
        <ScrollView className='bg-gray-100'
         >
          {/* Categories */}
          <Categories />

          {/* Featured */}
          {featuredCategories?.map((category) => {
            return <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description} />
          })}

        </ScrollView>

    </SafeAreaView>
  )
}