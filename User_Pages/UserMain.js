import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { database } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'

const UserMain = () => {

  const [name, setName] = useState('')
  const [responsibility, setResponsibility] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [fromseeCalender, setFromSeeCalender] = useState(false)
  const [toseeCalender, setToSeeCalender] = useState(false)
  const [email, setEmail] = useState('')

  const date = new Date()

  const collectionRef = collection(database, 'Requests')

  const requestinfo = {
    name: name,
    Email: email,
    responsibility: responsibility,
    startDate: startDate,
    endDate: endDate,
    reason: reason,
    when: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}`
  }

  const sendRequest = async () => { 

    if(name.length == 0 || responsibility.length == 0 || email.length == 0 || email.includes('@') == false || startDate.length == 0 || endDate.length == 0 || reason.length == 0 ){
      alert('Please fill all the fields')
    }else {
       await addDoc(collectionRef, requestinfo)
       .catch(err => console.log(err))
       alert('successfully sent look after your Email')
    }
    
  }

  return (
    <ScrollView showsVerticalScrollIndicator = {false}>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>Full Name: </Text>
        <TextInput 
        style = {styles.questioninput}
        placeholder='Full Name'
        textContentType='givenName'
        value={name}
        onChangeText={(newname) => setName(newname)}
        />
      </View>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>Email: </Text>
        <TextInput 
        style = {styles.questioninput}
        placeholder='Email Address'
        textContentType='emailAddress'
        value={email}
        onChangeText={(newemail) => setEmail(newemail)}
        />
      </View>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>Your responsibility: </Text>
        <TextInput 
        style = {styles.questioninput}
        placeholder='Your responsibility'
        textContentType='jobTitle'
        value={responsibility}
        onChangeText={(newresponsibility) => setResponsibility(newresponsibility)}
        />
      </View>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>Start Time: </Text>
        {!fromseeCalender ? (
          <View style={{flexDirection: 'row', width: 300}}>
          <TextInput 
          style = {[styles.questioninput, {width: 260}]}
          placeholder='Date and Time'
          textContentType='birthdate'
          value={startDate}
          onChangeText={(newstart) => setStartDate(newstart)}
          />
          <TouchableOpacity onPress={() => setFromSeeCalender(true)}>
            <Image 
            source={require('../assets/calender.jpg')}
            style = {{width: 50, height: 50, marginTop: 6}}
            />
          </TouchableOpacity>
          </View>
        ): (
          <View>
            <TouchableOpacity onPress={() => setFromSeeCalender(false)}>
              <Image 
              source={require('../assets/close.png')}
              style = {{width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
            <Calendar 
            onDayPress={(newdate) => {
              setFromSeeCalender(false)
              setStartDate(`${newdate.day}/${newdate.month}/${newdate.year}`)
            }}
            />
          </View>
        )}
      </View>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>End Time: </Text>
        {!toseeCalender ? (
          <View style={{flexDirection: 'row', width: 300}}>
          <TextInput 
          style = {[styles.questioninput, {width: 260}]}
          placeholder='Date and Time'
          textContentType='birthdate'
          value={endDate}
          onChangeText={(newend) => setEndDate(newend)}
          />
          <TouchableOpacity onPress={() => setToSeeCalender(true)}>
            <Image 
            source={require('../assets/calender.jpg')}
            style = {{width: 50, height: 50, marginTop: 6}}
            />
          </TouchableOpacity>
          </View>
        ): (
          <View>
            <TouchableOpacity onPress={() => setToSeeCalender(false)}>
              <Image 
              source={require('../assets/close.png')}
              style = {{width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
            <Calendar 
            onDayPress={(todate) => {
              setToSeeCalender(false)
              setEndDate(`${todate.day}/${todate.month}/${todate.year}`)
            }}
            />
          </View>
        )}
      </View>
      <View style= {styles.questionfamily}>
        <Text style = {styles.questiontxt}>Reason: </Text>
        <TextInput
        style = {styles.questioninput} 
        placeholder='Why you want it'
        textContentType='none'
        value={reason}
        onChangeText={(newreason) => setReason(newreason)}
        multiline = {true}
        />
      </View>
      <View style = {styles.touchfamily}>
        <TouchableOpacity 
        onPress={() => {
          setName('')
          setReason('')
          setResponsibility('')
          setEndDate('')
          setStartDate('')
        }}
        style = {styles.touch}
        >
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={sendRequest}
        style = {styles.touch}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create ({
      header: {
        alignItems: 'center',
        marginVertical: 15,
        backgroundColor: `rgba(150,150,100,0.5)`,
        height: 70,
        justifyContent: 'center',
        width: 200,
        marginHorizontal: 13,
        borderRadius: 20,
        alignSelf: 'flex-end'
      },
      questionfamily: {
        marginHorizontal: 15,
        marginVertical: 10
      },
      questiontxt: {
        fontSize: 16,
        marginVertical: 10
      },
      questioninput: {
        backgroundColor: '#90D26D',
        height: 60,
        marginLeft: 13,
        paddingLeft: 20,
        borderRadius: 30,
        color: 'white',
        width: 310
      },
      touchfamily: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginVertical: 20
      },
      touch: {
        backgroundColor: `rgba(100,123,150,0.5)`,
        width: 130,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }
})

export default UserMain