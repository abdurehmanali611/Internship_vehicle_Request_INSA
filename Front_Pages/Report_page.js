import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { Text } from 'react-native'
import { Image } from 'react-native'

const Report_page = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [trueAll, setTrueAll] = useState(false)


  const gettingData = async () => {
      await fetch('http://172.20.0.222:81/IFMS_Pro/API/VehicleTrackingApi')
      .then((response) => response.json())
      .then((data) => JSON.stringify(data))
      .then((parsed) => JSON.parse(parsed))
      .then((stringified) => setData(stringified))


      setIsLoading(false)

  }

  useEffect(() => {
    gettingData()
  })

  return (
    <View>
    <View>
      {data.length == 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        data.map((item, index) => (
          <View key={index}
          style={{}}
          >
            <MapView
            style={{width: '100%', height: '45%'}}
            region={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 3,
              longitudeDelta: 3,
            }}
            showsUserLocation = {true}
            >
              <Marker 
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={item.placeName}
              />
              <Circle 
              center={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              radius={500}
              strokeWidth={3}
              strokeColor='#4343AD'
              fillColor='#FFAD23'
              />
            </MapView>
          </View>
        ))
      )}
    </View>
        {trueAll ? (
          <View style={{zIndex: 30, position: 'absolute'}}>
            <TouchableOpacity
            style={{alignSelf: 'flex-end', marginVertical: 10, marginHorizontal: 10}}
            onPress={() => setTrueAll(!trueAll)}
            >
              <Image 
              source={require('../assets/close.png')}
              alt='close'
              style={{width: 50, height: 50, borderRadius: 20}}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal: 8}}>
            <View style={{flexDirection: 'row', gap: 10, marginVertical: 10}}>
            <View style={{paddingHorizontal: 10, backgroundColor: `rgba(150,110,110,0.5)`, borderRadius: 20}}>
                <Text style={{fontFamily: 'serif', fontWeight: '700', textDecorationLine: 'underline'}}>Vehicle Id</Text>
                {data.map((item, index) => (
                  <Text 
                  style={{textAlign: 'center', marginVertical: 10, fontWeight: '700', fontSize: 16}}
                  key={index}>{item.vehicle.vehicleId}</Text>
                ))}
              </View>
              <View style={{paddingHorizontal: 10, backgroundColor: `rgba(150,110,110,0.5)`, borderRadius: 20}}>
                <Text style={{fontFamily: 'serif', fontWeight: '700', textDecorationLine: 'underline'}}>Latitude</Text>
                {data.map((item, index) => (
                  <Text 
                  style={{textAlign: 'center', marginVertical: 10, fontWeight: '700', fontSize: 16}}
                  key={index}>{item.latitude}</Text>
                ))}
              </View>
              <View style={{paddingHorizontal: 10, backgroundColor: `rgba(150,110,110,0.5)`, borderRadius: 20}}>
                <Text style={{fontFamily: 'serif', fontWeight: '700', textDecorationLine: 'underline'}}>Longitude</Text>
                {data.map((item, index) => (
                  <Text 
                  style={{textAlign: 'center', marginVertical: 10, fontWeight: '700', fontSize: 16}}
                  key={index}>{item.longitude}</Text>
                ))}
              </View>
            </View>
             <View style={{flexDirection: 'row', gap: 4}}>
             <View style={{paddingHorizontal: 10, backgroundColor: `rgba(150,110,110,0.5)`, borderRadius: 20}}>
                <Text style={{fontFamily: 'serif', fontWeight: '700', textDecorationLine: 'underline'}}>PlaceName</Text>
                {data.map((item, index) => (
                  <Text 
                  style={{textAlign: 'center', marginVertical: 10, fontWeight: '700', fontSize: 16}}
                  key={index}>{item.placeName}</Text>
                ))}
              </View>
              <View style={{paddingHorizontal: 4, backgroundColor: `rgba(150,110,110,0.5)`, borderRadius: 20}}>
                <Text style={{fontFamily: 'serif', fontWeight: '700', textDecorationLine: 'underline'}}>Date of Info</Text>
                {data.map((item, index) => (
                  <Text 
                  style={{textAlign: 'center', marginVertical: 10, fontWeight: '700', fontSize: 16}}
                  key={index}>{item.date}</Text>
                ))}
              </View>
             </View>
            </View>
          </View>
        ): (
            <TouchableOpacity
        style={{zIndex: 30, position: 'absolute', alignSelf: 'flex-end', backgroundColor: `rgba(110,170,110,1)`, padding: 20, marginVertical: 10, marginRight: 35, borderRadius: 20}}
        onPress={() => setTrueAll(!trueAll)}
        >
          <Text>Show All</Text>
        </TouchableOpacity>
        )}
  </View>
  )
}

export default Report_page