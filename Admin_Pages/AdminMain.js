import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const AdminMain = () => {

  const [infos, setInfos] = useState([])
  const [key, setKey] = useState([])

  const values = []
  const keys = []

   const collectionRef = collection(database, 'Requests')

   const receivedRequest = async () => {
    await getDocs(collectionRef)
    .then(response => response.docs.map(item => {
      values.push(item.data())
      keys.push(item.id)
    }))
    setInfos(values)
    setKey(keys)
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
   const docToUpdate = doc(database, 'Requests', key.at(-1))
   updateDoc(docToUpdate, {
    status: 'Accepted'
   })
   alert('your acception sent successfully')
}

const rejected = () => {
  const docToUpdate = doc(database, 'Requests', key.at(-1))
  updateDoc(docToUpdate, {
   status: 'Rejected'
  })
  alert('your rejection sent successfully')
}


 return <ScrollView>
          <View style={{flexDirection:'column', gap: 30}}>
            {infos.map((item, index) => (
              <View 
              style={{alignItems: 'center', flexDirection: 'column', gap: 20, backgroundColor: `rgba(150,120,150,0.3)`, width: '90%', alignSelf: 'center', borderRadius: 20, marginTop: 20, padding: 20}}
              key={index}>
                <Text>Name: {item.name}</Text>
                <Text>Responsibility: {item.responsibility}</Text>
                <Text>Reason: {item.reason}</Text>
                <Text>From When: {item.startDate}</Text>
                <Text>To When: {item.endDate}</Text>
                <Text>{item.status}</Text>
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
            onPress={rejected}
            style={{backgroundColor: `rgba(200, 120,120, 0.5)`, width: 150, alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 30}}
            >
              <Text>Decline</Text>
            </TouchableOpacity>
           </View>
    </ScrollView>
 
}

export default AdminMain