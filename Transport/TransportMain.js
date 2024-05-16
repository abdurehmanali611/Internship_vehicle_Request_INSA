import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { CheckBox } from 'react-native-elements'
import * as SMS from 'expo-sms'

const TransportMain = ({navigation}) => {

  const [infos, setInfos] = useState([])
  const [keys, setKeys] = useState([])
  const [reasonHas, setReasonHas] = useState(false)
  const [reason, setReason] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)

  const collectionRef = collection(database, 'Requests')

  const receivedRequest = async () => {
    const response = await getDocs(collectionRef)
    const data = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setInfos(data)
    setKeys(data.map(item => item.id))
    console.log(infos.map(item => {return item.Phone}));
  }

  useEffect(() => {
    receivedRequest()
  }, []) 

  const Rejected = async () => {

    setReasonHas(!reasonHas)
   const isSMSAvailable =  await SMS.isAvailableAsync()
   setIsAvailable(isSMSAvailable)

  }

  // sending to email the info functionality for next

  return (
    <ScrollView>
      <View style={{ flexDirection: 'column', gap: 40 }}>
        {infos.map((item, index) => (
          <View key={index}>
            <Text 
            style={{ marginHorizontal: '26%', zIndex: 20, position: 'absolute', backgroundColor: `rgba(120,151,150,1)`, width: 200, height: 40, borderRadius: 30, textAlign: 'center', textAlignVertical: 'center'}}
            >
              Status: {item.sign}
            </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              gap: 20,
              backgroundColor: `rgba(150,120,150,0.3)`,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 20,
              padding: 20
            }}
          >
            <Text>Name: {item.name}</Text>
            <Text>Responsibility: {item.responsibility}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>From When: {item.startDate}</Text>
            <Text>To When: {item.endDate}</Text>
            <Text style={{ alignSelf: 'flex-start', marginVertical: 10, fontSize: 12 }}>Sent: {item.when}</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={async () => {
            if (keys.length === 0) return; 
            const docToUpdate = doc(database, 'Requests', keys[index])
            await updateDoc(docToUpdate, { sign: 'Accepted' })
            alert('Your acceptance was sent successfully')
            navigation.navigate('Assign', {
              key: keys[index]
            })
          }}
          style={{ backgroundColor: `rgba(120, 200,150, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30 }}
        >
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Rejected}
          style={{ backgroundColor: `rgba(200, 120,120, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30 }}
        >
          <Text>Decline</Text>
        </TouchableOpacity>
      </View>
      {reasonHas && (
        <View style={{ alignItems: 'center', flexDirection: 'column', gap: 20, marginVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>Your Reason Please</Text>
          <TextInput
            placeholder='Your reason'
            textContentType='none'
            value={reason}
            onChangeText={setReason}
            multiline
            style={{ backgroundColor: `rgba(120,130,120,0.5)`, width: '70%', borderRadius: 30, height: 100, paddingHorizontal: 10 }}
          />
          {isAvailable ? <Text>To {item.Phone}</Text>: <Text>Email Not Available</Text>}
          <TouchableOpacity
            onPress={async () => {
              if (keys.length === 0) return; 
              const docToUpdate = doc(database, 'Requests', keys[index])
              await updateDoc(docToUpdate, { 
                sign: 'Rejected',
                why: {reason}
               })
               SMS.sendSMSAsync (
                [item.Phone],
                `Your request was rejected because of ${reason}`
               )
              alert('Your rejection was sent successfully')
            }}
            style={{ backgroundColor: `rgba(150,120,120,0.5)`, alignSelf: 'flex-end', marginHorizontal: 20, width: 150, borderRadius: 20, height: 50, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
        ))}
      </View>
     
    </ScrollView>
  )
}

export default TransportMain
