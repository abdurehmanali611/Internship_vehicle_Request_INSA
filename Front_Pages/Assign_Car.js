import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { database } from '../config/firebase'
import { TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import * as SMS from 'expo-sms'

const Assign_Car = () => {

    const router = useRoute()

    const Assign_key = router.params?.key

    const [datas, setDatas] = useState([])
    const [keys, setKeys] = useState([])
    const [carKey, setCarKey] = useState([])
    const [tosendEmail, setTosendEmail] = useState({})
    const [smsAvailable, setSmsAvailable] = useState(false)
    const [requestorPhone, setRequestorPhone] = useState('')

    const collectionRef = collection(database, 'Requests')
    const collectionRef2 = collection(database, 'Car Informations')

    const getData = async () => {
        const response = await getDocs(collectionRef2)
        const data = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setDatas(data)
        setCarKey(data.map(car => car.id))
        console.log(datas);

        const response2 = await getDocs(collectionRef)
        const data2 = response2.docs.map(doc => ({
            id: doc.id,
           ...doc.data()
        }))

        setTosendEmail(data2.find(item => item.id == Assign_key))
        setKeys(data2.map(item => item.id))
        console.log(keys);
        setRequestorPhone(tosendEmail.Phone)
        console.log(requestorPhone);
    }

    useEffect(() => {
        getData()
        const ispossible = async () => {
           const availability = await SMS.isAvailableAsync()
            setSmsAvailable(availability)
        }

        ispossible()
    }, [])

  return (
    <ScrollView showsVerticalScrollIndicator = {false}>
        {datas.length == 0 ? (
            <Text>No car please wait</Text>
        ):(
            datas.map((item, index) => (
                <View key={index}>
                        <Text style={{fontSize: 20, backgroundColor: `rgba(120,100,102,0.5)`, height: 80, textAlignVertical: 'center', textAlign: 'center', borderRadius: 30, marginHorizontal: 15}}>Car {index + 1} Informations</Text>
                <View 
                style = {{ flexDirection: 'row', gap: 15, marginVertical: 20, flexWrap: 'wrap', marginHorizontal: 20}} >
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 100, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Driver Name</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.DriverName}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 100, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Driver Phone</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.DriverPhone}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 100, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Car Name</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.carName}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 155, height: 110, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Plate Number</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.PlateNumber}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 110, alignItems: 'center', borderRadius: 20, alignSelf: 'center'}}>
                        <Text style={{fontWeight: '600'}}>Company Name</Text>
                        <Text style={{marginTop: 5, flexWrap: 'wrap'}}>{item.companyName}</Text>
                    </View>
                    <Text>{item.isAssigned ? 'Assigned': 'Free'}</Text>
                    <View style={{flexDirection: 'row-reverse', gap: 20, marginVertical: 20}}>
                    <TouchableOpacity
                    onPress={async () => {
                        const uptoDate = doc(database, 'Requests', Assign_key)
                        updateDoc(uptoDate, {
                            isAssigned: true,
                            plate: `Plate Number: ${item.PlateNumber}`
                        })
                        await SMS.sendSMSAsync(
                            [item.DriverPhone, requestorPhone],
                            `${item.DriverName} will serve ${tosendEmail.name} the ${tosendEmail.responsibility} from ${tosendEmail.startDate} to ${tosendEmail.endDate}`
                        )
                        
                        .catch((err) => alert(`update Error: ${err.message}`))
                    }} 
                    style={{backgroundColor: `rgba(120,160,130,0.4)`, width: 150, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                        <Text>Allow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={async () => {
                        const uptoDate = doc(database, 'Car Informations', carKey[index])
                        updateDoc(uptoDate, {
                            isAssigned: true
                        })
                        .then(() => alert('Successfully updated the database information'))
                        .catch((err) => alert(`update Error: ${err.message}`))
                    }} 

                    style={{backgroundColor: `rgba(120,160,130,0.4)`, width: 150, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            ))
        )}
    </ScrollView>
  )
}

export default Assign_Car