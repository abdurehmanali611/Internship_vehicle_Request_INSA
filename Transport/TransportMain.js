import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const TransportMain = () => {

  const [reasonhas, setreasonHas] = useState(false)
  const [infos, setInfos] = useState([])
  const [reason, setReason] = useState('')
  const [key, setKey] = useState('')

  const values = []

   const collectionRef = collection(database, 'Requests')

   const receivedRequest = async () => {
    await getDocs(collectionRef)
    .then(response => response.docs.map(item => {
      values.push(item.data())
      setKey(item.id)
    }))
    setInfos(values)
  }

useEffect(() => {
  receivedRequest()

  const interval =setInterval(() => {

  }, 60000)

  return () => {
    clearInterval(interval)
  }
})

const accepted = () => {
   const docToUpdate = doc(database, 'Requests', key)
   updateDoc(docToUpdate, {
    sign: 'Accepted',
    plate: 'use a car with a plate number'
   })
   alert('your acception sent successfully')
}

const rejected = () => {
  const docToUpdate = doc(database, 'Requests', key)
  updateDoc(docToUpdate, {
   sign: 'Rejected'
  })
  alert('your rejection sent successfully')
}


 return <ScrollView>
          <View style={{flexDirection: 'column-reverse', gap: 30}}>
            {infos.map((item, index) => (
              <View 
              style={{alignItems: 'center', flexDirection: 'column', gap: 20, backgroundColor: `rgba(150,120,150,0.3)`, width: '90%', alignSelf: 'center', borderRadius: 20, marginTop: 20, padding: 20}}
              key={index}>
                <Text>Name: {item.name}</Text>
                <Text>Responsibility: {item.responsibility}</Text>
                <Text>Reason: {item.reason}</Text>
                <Text>From When: {item.startDate}</Text>
                <Text>To When: {item.endDate}</Text>
                <Text>Status: {item.status}</Text>
                <Text style={{alignSelf: 'flex-start', marginVertical: 10, fontSize: 12}}>sent: {item.when}</Text>
              </View>
            ))}
          </View>
           <View style={{flexDirection: 'row-reverse', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-between'}}>
            <TouchableOpacity
            onPress={accepted}
            style={{backgroundColor: `rgba(120, 200,150, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30}}
            >
              <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setreasonHas(!reasonhas)}
            style={{backgroundColor: `rgba(200, 120,120, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30}}
            >
              <Text>Decline</Text>
            </TouchableOpacity>
           </View>
           {reasonhas && (
            <View style={{alignItems: 'center', marginVertical: 20, flexDirection: 'column', gap: 20}}>
              <Text style={{fontSize: 18}}>Your Reason For Rejection: </Text>
              <TextInput 
              style={{backgroundColor: `rgba(100,130,120,0.5)`, width: '80%', height: 150, borderRadius: 30, textAlignVertical: 'top', padding: 15}}
              placeholder='Your reason'
              value={reason}
              onChangeText={(newreason) => setReason(newreason)}
              textContentType='none'
              />
              <TouchableOpacity
              onPress={rejected}
              style={{backgroundColor: `rgba(100, 130,200,0.5)`, width: 140, height: 60, alignItems: 'center', justifyContent: 'center',borderRadius: 30, alignSelf: 'flex-end', marginHorizontal: 20}}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
           )}
    </ScrollView>
 
}

export default TransportMain