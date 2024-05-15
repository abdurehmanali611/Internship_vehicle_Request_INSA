import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { database } from '../config/firebase'
import { TouchableOpacity } from 'react-native'

const Assign_Car = () => {

    const [datas, setDatas] = useState([])
    const [keys, setKeys] = useState([])
    const values = []

    const collectionRef = collection(database, 'Requests')
    const collectionRef2 = collection(database, 'Car Informations')

    const getData = async () => {
        const response = await getDocs(collectionRef2)
        const data = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setDatas(data)
        console.log(datas);

        const response2 = await getDocs(collectionRef)
        const data2 = response2.docs.map(doc => ({
            id: doc.id,
           ...doc.data()
        }))
        setKeys(data2.map(item => item.id))
        console.log(keys);
    }

    useEffect(() => {
        getData()
    }, [])
  return (
    <View>
        {datas.length == 0 ? (
            <Text>No car please wait</Text>
        ):(
            datas.map((item, index) => (
                <View>
                        <Text style={{fontSize: 20, backgroundColor: `rgba(120,100,102,0.5)`, height: 80, textAlignVertical: 'center', textAlign: 'center', borderRadius: 30, marginHorizontal: 15}}>Car {index + 1} Informations</Text>
                <View 
                style = {{ flexDirection: 'row', gap: 15, marginVertical: 20, flexWrap: 'wrap', marginHorizontal: 20}}
                key={index} >
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 100, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Driver Name</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.DriverName}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 100, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Car Name</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.carName}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 155, height: 110, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '700'}}>Plate Number</Text>
                        <Text style={{marginTop: 10, flexWrap: 'wrap'}}>{item.PlateNumber}</Text>
                    </View>
                    <View style={{backgroundColor: `rgba(102,102,120,0.3)`, width: 150, height: 110, alignItems: 'center', borderRadius: 20}}>
                        <Text style={{fontWeight: '600'}}>Company Name</Text>
                        <Text style={{marginTop: 5, flexWrap: 'wrap'}}>{item.companyName}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={() => {
                        const uptoDate = doc(database, 'Requests', keys[index])
                        updateDoc(uptoDate, {
                            isAssigned: true,
                            plate: `Plate Number: ${item.PlateNumber}`
                        })
                        .then(() => alert('Your Assigning has been sent successfully'))
                        .catch((err) => alert(err.message))
                    }} 
                    style={{marginHorizontal: 180, backgroundColor: `rgba(120,160,130,0.4)`, width: 150, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                        <Text>Allow</Text>
                    </TouchableOpacity>
                </View>
            </View>
            ))
        )}
    </View>
  )
}

export default Assign_Car