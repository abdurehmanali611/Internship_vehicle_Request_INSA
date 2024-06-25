import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

const ManagerMain = ({navigation}) => {


  const [carName, setCarName] = useState()
  const [driverName, setDriverName] = useState()
  const [company, setCompany] = useState()
  const [plateNumber, setPlateNumber] = useState()
  const [driverPhone, setDriverPhone] = useState()  

  // the below method is used to post cars information to the API after checking that the textinputs for the car information are not empty
  const submitted = async () => {
      
  }

  return (
    <ScrollView>
        <TouchableOpacity
        style={{alignSelf: 'flex-end', marginVertical: 20, marginHorizontal: 10, alignItems: 'center', backgroundColor: `rgba(120,150,120,0.3)`, padding: 10, borderRadius: 20,flexDirection: 'row'}}
        onPress={() => navigation.navigate('report')}
        >
        <Image 
        source={require('../assets/report.jpg')}
        style = {{width: 50, height: 50, borderRadius: 40}}
        alt='report'
        />
        <Text style = {{fontSize: 19, fontFamily: 'serif'}}>Report</Text>
        </TouchableOpacity>
      <View style={{marginVertical: 20, flexDirection: 'column', gap: 25, marginHorizontal: 10}}>
        <Text style={{textAlign: 'flex-start', fontSize: 20, fontFamily: 'serif'}}>Car Name:</Text>
        <TextInput 
        placeholder='Car Name'
        textContentType='givenName'
        value={carName}
        onChangeText={(newName) => setCarName(newName)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(110,120,110,0.15)`, height: 60, borderRadius: 30, paddingHorizontal: 15,fontFamily: 'serif'}}
        />
        <Text style={{textAlign: 'flex-start', fontSize: 20, fontFamily: 'serif'}}>Driver Name:</Text>
        <TextInput 
        placeholder='Driver Name'
        textContentType='givenName'
        value={driverName}
        onChangeText={(newDriver) => setDriverName(newDriver)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(110,120,110,0.15)`, height: 60, borderRadius: 30, paddingHorizontal: 15, fontFamily: 'serif'}}
        />
        <Text style={{textAlign: 'flex-start', fontSize: 20, fontFamily: 'serif'}}>Driver Phone:</Text>
        <TextInput 
        placeholder='Driver Phone'
        textContentType='telephoneNumber'
        value={driverPhone}
        onChangeText={(newphone) => setDriverPhone(newphone)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(110,120,110,0.15)`, height: 60, borderRadius: 30, paddingHorizontal: 15, fontFamily: 'serif'}}
        />
        <Text style={{textAlign: 'flex-start', fontSize: 20, fontFamily: 'serif'}}>Company Name:</Text>
        <TextInput 
        placeholder='company Name'
        textContentType='givenName'
        value={company}
        onChangeText={(newcompany) => setCompany(newcompany)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(110,120,110,0.15)`, height: 60, borderRadius: 30, paddingHorizontal: 15, fontFamily: 'serif'}}
        />
        <Text style={{textAlign: 'flex-start', fontSize: 20, fontFamily: 'serif'}}>plate Number:</Text>
        <TextInput 
        placeholder='Plate Number'
        textContentType='givenName'
        value={plateNumber}
        onChangeText={(newplate) => setPlateNumber(newplate)}
        style={{marginHorizontal: 20, backgroundColor: `rgba(110,120,110,0.15)`, height: 60, borderRadius: 30, paddingHorizontal: 15, fontFamily: 'serif'}}
        />
      </View>
      <View style={{marginVertical: 10}}>
        <TouchableOpacity
        style={{alignItems: 'center', marginVertical: 10, backgroundColor: `rgba(120,150,110,0.75)`, height: 60, width: 150, borderRadius: 30, justifyContent: 'center', alignSelf: 'center'}}
        onPress={submitted}
        >
          <Text style={{fontFamily: 'serif', fontSize: 19}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ManagerMain