import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native'

const Report_page = () => {

    const [infos, setinfos] = useState([])
    const [keys, setKeys] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const collectionRef = collection(database, 'Car Informations')

    const gettingData = async () => {
        const response = await getDocs(collectionRef)
        const data = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        setinfos(data)
        setKeys(data.map(item => item.id))
        console.log(infos);
        setIsLoading(false)
    }

    useEffect(() => {
        gettingData()
    }, [])

    if (isLoading) {
        return <View style={{alignSelf: 'center', alignItems: 'center', marginVertical: 10}}>
          <ActivityIndicator size={40} />
          <Text>Loading...</Text>
        </View>
    }

  return (
    <View>
      <Text style = {{textAlign: 'center', marginVertical: 10, fontSize: 20}}>Cars</Text>
      {infos.map((info, index) => (
            <View key={index}>
            <Text style={{zIndex: 10, position: 'absolute', alignSelf: 'center', backgroundColor: `rgba(120,130,150,0.4)`, width: 120, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 20}}>{info.isAssigned ? 'Assigned': 'Free'}</Text>
              <View 
              style={{alignSelf: 'center', marginVertical: 20, backgroundColor: `rgba(200,182,190,0.4)`, width: 330, padding: 20, borderRadius: 20}}
              >
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Driver Name: </Text>
                  <Text style={{fontSize: 17}}>{info.DriverName}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Car Name: </Text>
                  <Text style={{fontSize: 17}}>{info.carName}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Plate Number: </Text>
                  <Text style={{fontSize: 17}}>{info.PlateNumber}</Text>
                </View>  
              </View> 
              </View>         
      ))}
    </View>
  )
}

export default Report_page