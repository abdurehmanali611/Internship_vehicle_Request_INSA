import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const TransportMain = ({navigation}) => {

  const [infos, setInfos] = useState([])
  const [keys, setKeys] = useState([])
  const [reasonHas, setReasonHas] = useState(false)
  const [reason, setReason] = useState('')

  const collectionRef = collection(database, 'Requests')

  const receivedRequest = async () => {
    const response = await getDocs(collectionRef)
    const data = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setInfos(data)
    setKeys(data.map(item => item.id))
  }

  useEffect(() => {
    receivedRequest()
   
  }, []) // Empty dependency array to run effect only once

  const accepted = async () => {
    if (keys.length === 0) return; // Ensure there's at least one request
    const docToUpdate = doc(database, 'Requests', keys[keys.length - 1])
    await updateDoc(docToUpdate, { sign: 'Accepted' })
    alert('Your acceptance was sent successfully')
    navigation.navigate('Assigning_car')
  }

  const rejected = async () => {
    if (keys.length === 0) return; // Ensure there's at least one request
    const docToUpdate = doc(database, 'Requests', keys[keys.length - 1])
    await updateDoc(docToUpdate, { 
      sign: 'Rejected',
      why: {reason}
     })
    alert('Your rejection was sent successfully')
  }

  return (
    <ScrollView>
      <View style={{ flexDirection: 'column', gap: 30 }}>
        {infos.map((item, index) => (
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
            key={index}
          >
            <Text>Name: {item.name}</Text>
            <Text>Responsibility: {item.responsibility}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>From When: {item.startDate}</Text>
            <Text>To When: {item.endDate}</Text>
            <Text>Admin Response: {item.status}</Text>
            <Text style={{ alignSelf: 'flex-start', marginVertical: 10, fontSize: 12 }}>Sent: {item.when}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={accepted}
          style={{ backgroundColor: `rgba(120, 200,150, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30 }}
        >
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReasonHas(!reasonHas)}
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
          <TouchableOpacity
            onPress={rejected}
            style={{ backgroundColor: `rgba(150,120,120,0.5)`, alignSelf: 'flex-end', marginHorizontal: 20, width: 150, borderRadius: 20, height: 50, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default TransportMain
