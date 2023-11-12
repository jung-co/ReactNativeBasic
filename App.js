import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);
  const ask = async() => { 
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false); //허가 정보에 따라 다른 화면 노출가능
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps: false}
    );
    setCity(location[0].city);
  }
  useEffect(() => {
    ask()
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Hello! I made a RN App!</Text>
    //   <StatusBar style="auto" />
    // </View>
        // {/* <StatusBar style="light"></StatusBar> */}
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // indicatorStyle='green'
          contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>SUNNY</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>SUNNY</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>SUNNY</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>SUNNY</Text>
          </View> 
        </ScrollView>
      </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor: "orange"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: 500
  },
  weather: {
    // flex: 3,
  },
  day: {
    // backgroundColor: "blue",
    width: SCREEN_WIDTH,
    alignItems: "center"
  },
  temp: {
    marginTop: 60,
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
})
