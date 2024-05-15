import { TextInput, TouchableOpacity, View, Text } from 'react-native'
import React, { useState } from 'react'
import { database } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'

const ManagerMain = () => {

  const collectionRef = collection(database, 'Car Informations')

  const [carName, setCarName] = useState()
  const [driverName, setDriverName] = useState()
  const [company, setCompany] = useState()
  const [plateNumber, setPlateNumber] = useState()
  const [isAssigned, setIsAssigned] = useState(false)

  const submitted = () => {
      carName == '' || driverName == '' || company == '' || plateNumber == ''  ? 
      alert('Please fill the above informations'):
      addDoc(collectionRef, {
        carName: carName, 
        DriverName: driverName, 
        companyName: company, 
        PlateNumber: plateNumber,
        isAssigned: isAssigned
      })
      .then((res) => 
      alert('You have successfully added a new car to your collection', res.id))
      .catch(err => alert(err.message))
  }

  return (
    <View>
      <View style={{marginVertical: 20, flexDirection: 'column', gap: 25}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>Car Name</Text>
        <TextInput 
        placeholder='Car Name'
        textContentType='givenName'
        value={carName}
        onChangeText={(newName) => setCarName(newName)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(120,120,112,0.5)`, height: 60, borderRadius: 30, paddingHorizontal: 15}}
        />
        <Text style={{textAlign: 'center', fontSize: 20}}>Driver Name</Text>
        <TextInput 
        placeholder='Driver Name'
        textContentType='givenName'
        value={driverName}
        onChangeText={(newDriver) => setDriverName(newDriver)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(120,120,112,0.5)`, height: 60, borderRadius: 30, paddingHorizontal: 15}}
        />
        <Text style={{textAlign: 'center', fontSize: 20}}>Company Name</Text>
        <TextInput 
        placeholder='company Name'
        textContentType='givenName'
        value={company}
        onChangeText={(newcompany) => setCompany(newcompany)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(120,120,112,0.5)`, height: 60, borderRadius: 30, paddingHorizontal: 15}}
        />
        <Text style={{textAlign: 'center', fontSize: 20}}>plate Number</Text>
        <TextInput 
        placeholder='Plate Number'
        textContentType='givenName'
        value={plateNumber}
        onChangeText={(newplate) => setPlateNumber(newplate)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(120,120,112,0.5)`, height: 60, borderRadius: 30, paddingHorizontal: 15}}
        />
      </View>
      <View>
        <TouchableOpacity
        style={{alignItems: 'center', marginVertical: 10, backgroundColor: `rgba(120,100,102,0.5)`, height: 60, width: 150, borderRadius: 30, justifyContent: 'center', alignSelf: 'center'}}
        onPress={submitted}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ManagerMain