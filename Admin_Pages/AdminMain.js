import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

const AdminMain = () => {
  const [infos, setInfos] = useState([])
  const [reasonHas, setReasonHas] = useState([])
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // Make isLoading false when you finish fetching data from the API in receivedRequest() method
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)
  // the above two state variables are for touchableOpacity ACCEPTED and REJECTED you can check it from line 49 to 68


  // The method below is for getting data from the API when app restarted
  // Assign the values in infos i mean make them in setInfos
  const receivedRequest = async () => {
    
  }

  // The method below is for posting data to the ApI when user Request is Accepted
  // this method will update on the API by adding a variable called 'status' making its value 'Accepted'
  const Accepted = async () => {

  }

  // The method below is for posting data to the ApI when user Request is Rejected and imported the reason of rejection
  // this method will update on the API by adding a variable called 'status' making its value 'Rejected' and there is a reason textinput
  // you can assign in variable what ever you want
  const Declined = async () => {

  }

  useEffect(() => {
    receivedRequest()

  }, []) 

  if (isLoading) {
    return <View style={{alignItems: 'center', marginVertical: 20}}>
      <ActivityIndicator size={30} color='green'/>
      <Text style={{fontSize: 19}}>Loading...</Text>
    </View>
  }

  return (
    <ScrollView>
      <View style={{ flexDirection: 'column', gap: 30 }}>
      <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
            <TouchableOpacity
                onPress={() => {
                  setDeclined(false)
                  setAccepted(!accepted)
                }}
                style={{backgroundColor: `rgba(100,130,100,0.5)`, padding: 10, borderRadius: 20}}
                >
                  <Text>ACCEPTED</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                  setAccepted(false)
                  setDeclined(!declined)
                }}
                style={{backgroundColor: `rgba(140,100,100,0.5)`, padding: 10, borderRadius: 20}}
                >
                  <Text>REJECTED</Text>
                </TouchableOpacity>
            </View>
            {accepted && (
            infos.map((item, index) => (
            item.status == 'Accepted' && (
              <View style={{marginVertical: 10}}>
                <Text style={{zIndex: 30, position: 'absolute', backgroundColor: `rgba(100,140,110,0.5)`, padding: 8, borderRadius: 20, alignSelf: 'center', marginBottom: 10}}>{item.status}</Text>
              <View
              key={index}
              style={{
              alignItems: 'center',
              flexDirection: 'column',
              gap: 20,
              backgroundColor: `rgba(100,150,100,0.3)`,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 20,
              padding: 20
            }}
          >
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Name:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Responsibility:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.responsibility}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Start Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.startDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>End Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.endDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Reason:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.reason}</Text>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginVertical: 10, fontSize: 12 }}>Sent: {item.when}</Text>
          </View>
        </View>
            )
          ))
         )}
         {declined && (
          infos.map((item, index) => (
            item.status == 'Rejected' && (
              <View>
                <Text style={{zIndex: 30, position: 'absolute', backgroundColor: `rgba(100,140,110,0.5)`, padding: 8, borderRadius: 20, alignSelf: 'center', marginBottom: 10}}>{item.status}</Text>
              <View
              key={index}
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              gap: 20,
              backgroundColor: `rgba(100,150,100,0.3)`,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 20,
              padding: 20
            }}
          >
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Name:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Responsibility:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.responsibility}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Start Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.startDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>End Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.endDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Reason:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.reason}</Text>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginVertical: 10, fontSize: 12 }}>Sent: {item.when}</Text>
          </View>
        </View>
            )
          ))
         )}
        {infos.map((item, index) => (
          item.status == null && (
          <View key={index}>
            <Text 
            style={{ marginHorizontal: '26%', zIndex: 20, position: 'absolute', backgroundColor: `rgba(170,120,120,0.8)`, width: 200, height: 40, borderRadius: 30, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'serif',color: 'white'}}
            >
              Status: {item.status}
            </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              gap: 20,
              backgroundColor: `rgba(100,150,100,0.3)`,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 20,
              padding: 20
            }}
          >
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Name:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Responsibility:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.responsibility}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Start Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.startDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>End Date:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.endDate}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={{fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}>Reason:</Text>
              <Text style={{fontFamily: 'serif', fontSize: 17}}>{item.reason}</Text>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginVertical: 10, fontSize: 12 }}>Sent: {item.when}</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={Accepted}
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
        {reasonHas[index] && (
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
              onPress={Declined}
              style={{ backgroundColor: `rgba(150,120,120,0.5)`, alignSelf: 'flex-end', marginHorizontal: 20, width: 150, borderRadius: 20, height: 50, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>  
        )}
        </View>
          )
        ))}
      </View>
         
    </ScrollView>
  )
}

export default AdminMain
