import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'

const ManagerMain = () => {

  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const values = []

  useEffect(() => {
      try {
        fetch('http://172.20.0.222/IFMS_PRO/API/VehicleTrackingApi')
        .then((response) => response.json())
        .then((data) =>
        {
          data.forEach(element => {
            values.push({
              info_id: element.latestVehicleId,
              vId: element.vehicleId,
              dId: element.driverId,
              latitude: element.latitude,
              longitude: element.longitude,
              speed: element.speed.toString(),
              status: element.statusType,
              date: element.date,
              placeName: element.placeName
            })
          });
          setInfo(values)
          setIsLoading(false)
        })
      } catch (error) {
        console.log(error);
      }

      const interval = setInterval(() => {
        
      }, 60000);

      return () => {
        clearInterval(interval)
      }
  }, [info])

  if (isLoading || info.length == 0) {
    <Text>Loading...</Text>
  }
  return (
    <View>
       <MapView 
       style={{width: Dimensions.get('window').width * 0.9,
       height: Dimensions.get('window').height * 0.5,
       marginHorizontal: 20,
       marginVertical: 20
      }}
      initialRegion={{
        latitude: 8.9888,
        longitude: 38.7707,
        latitudeDelta: 2,
        longitudeDelta: 2
      }}
       >
          {info.map((item, index) => 
          <Marker 
          key={index}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude
          }}
          title={item.placeName}
          />
          )}
       </MapView>
    </View>
  )
}

export default ManagerMain