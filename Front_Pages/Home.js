import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'

const Home = () => {

  const [infos, setInfo] = useState([])
  const [reason, setReason] = useState([])
  const values = []
  const cases = []
  const colectionRef = collection(database, 'Requests')

  const receivedFile = async () => {
     await getDocs(colectionRef)
     .then(response => response.docs.map(doc => {
      values.push(doc.data())
      cases.push(doc.data().info)
     }))
     setInfo(values)
     setReason(cases)
  }

  useEffect(() => {
    receivedFile()
  })

  return (
        <View style={{flexDirection: 'column-reverse', gap: 30}}>
            {infos.length === 0 ? (
              <Text style={{textAlign: 'center', fontSize: 23, marginVertical: 20}}>Loading...</Text>
            ):(
              infos.map((item, index) => (
                <View 
                style={{alignItems: 'center', backgroundColor: `rgba(150,120,150,0.3)`, width: '90%', alignSelf: 'center', borderRadius: 20, marginTop: 20, padding: 20, flexDirection: 'column', gap: 20}}
                key={index}>
                    <Text>status: {item.sign}</Text>
                    <Text>{item.plate}</Text>
                </View>
              ))
            )}
        </View>
  )
}

export default Home