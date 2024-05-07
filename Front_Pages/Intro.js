import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Intro = ({navigation}) => {
  return (
    <View style = {styles.overall}>
      <View style = {styles.header}>
      <Text style= {styles.headertxt}>Select Your Role</Text>
      </View>
      <View>
        <TouchableOpacity 
        onPress={() => navigation.navigate('ManagerLogin')}
        style = {styles.touch}>
            <Text style={{color: 'white'}}>Login as Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('AdminLogin')}
        style = {styles.touch}>
            <Text style={{color: 'white'}}>Login as Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('transportLogin')}
        style = {styles.touch}>
            <Text style={{color: 'white'}}>Login as Transport Head</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('UserLogin')}
        style = {styles.touch}>
            <Text style={{color: 'white'}}>Login as User</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  overall: {
    paddingTop: '18%'
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: `rgba(100,200,100,0.5)`,
    width: '70%',
    alignSelf: 'center',
    height: '10%',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  headertxt : {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  touch: {
    backgroundColor: `rgba(100,10,150,0.5)`,
    width: '80%',
    alignSelf: 'center',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 20
  }
})

export default Intro