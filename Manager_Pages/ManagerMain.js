import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { database } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ScrollView } from 'react-native'

const ManagerMain = ({navigation}) => {

  const collectionRef = collection(database, 'Car Informations')

  const [carName, setCarName] = useState()
  const [driverName, setDriverName] = useState()
  const [company, setCompany] = useState()
  const [plateNumber, setPlateNumber] = useState()
  const [driverPhone, setDriverPhone] = useState()  

  const submitted = () => {
      carName == '' || driverName == '' || company == '' || plateNumber == ''  ? 
      alert('Please fill the above informations'):
      addDoc(collectionRef, {
        carName: carName, 
        DriverName: driverName, 
        companyName: company, 
        PlateNumber: plateNumber,
        isAssigned: false,
        DriverPhone: driverPhone
      })
      .then((res) => 
      alert('You have successfully added a new car to your collection', res.id))
      .catch(err => alert(err.message))
  }

  return (
    <ScrollView>
        <TouchableOpacity
        style={{alignSelf: 'flex-end', marginVertical: 20, marginHorizontal: 10, alignItems: 'center', backgroundColor: `rgba(120,110,110,0.5)`, padding: 10, borderRadius: 20}}
        onPress={() => navigation.navigate('report')}
        >
        <Image 
        source={require('../assets/report.jpg')}
        style = {{width: 50, height: 50, borderRadius: 40}}
        alt='report'
        />
        <Text style = {{fontSize: 18}}>Report</Text>
        </TouchableOpacity>
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
        <Text style={{textAlign: 'center', fontSize: 20}}>Driver Phone</Text>
        <TextInput 
        placeholder='Driver Phone'
        textContentType='telephoneNumber'
        value={driverPhone}
        onChangeText={(newphone) => setDriverPhone(newphone)}
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
    </ScrollView>
  )
}

export default ManagerMain