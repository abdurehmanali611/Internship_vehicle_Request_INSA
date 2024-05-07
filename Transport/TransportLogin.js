import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TransportLogin = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userCheck = () => {
      email.length == 0 || email.includes('@') == false || password.length == 0 ? 
      alert('Please enter your Email or Password'):
      navigation.navigate('transportMain')
  }

  return (
    <View>
      <Text style = {styles.header}>Login</Text>
      <View style = {styles.family}>
        <Text style = {styles.sontxt}>Email: </Text>
        <TextInput 
        style = {styles.soninput}
        placeholder='Your Email Address'
        textContentType='emailAddress'
        value={email}
        onChangeText={(newemail) => setEmail(newemail)}
        />
      </View>
      <View style = {styles.family}>
        <Text style = {styles.sontxt}>Password: </Text>
        <TextInput
        style = {styles.soninput} 
        placeholder='Your Password'
        textContentType='password'
        value={password}
        onChangeText={(newpassword) => setPassword(newpassword)}
        />
      </View>
        <TouchableOpacity
        onPress={userCheck}
        style={styles.touch}
        >
          <Text>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create ({
    header: {
      fontSize: 25,
      textAlign: 'center',
      marginTop: '25%',
      backgroundColor: `rgba(200,180,170,0.5)`,
      width: '50%',
      alignSelf: 'center',
      height: '20%',
      textAlignVertical: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginVertical: 13
    },
    family: {
      marginHorizontal: 18,
      marginVertical: 20
    },
    sontxt: {
      fontSize: 18
    },
    soninput: {
      backgroundColor: `rgba(100,10,50,0.5)`,
      height: 60,
      borderRadius: 20,
      paddingLeft: 20,
      marginLeft: 10
    },
    touch: {
    backgroundColor: `rgba(100,10,150,0.5)`,
    height: 60,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15
    }
})

export default TransportLogin