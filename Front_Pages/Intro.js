import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
            <Image 
            source={require('../assets/manager.jpg')}
            alt='manager'
            style={{width: 50, height: 50, borderRadius: 20}}
            />
            <Text style={{color: 'black', fontFamily: 'serif', fontSize: 20}}>Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('AdminLogin')}
        style = {styles.touch}>
          <Image 
            source={require('../assets/admin.avif')}
            alt='admin'
            style={{width: 50, height: 50, borderRadius: 20}}
            />
            <Text style={{color: 'black', fontFamily: 'serif', fontSize: 20}}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('transportLogin')}
        style = {styles.touch}>
        <Image 
            source={require('../assets/bus.jpg')}
            alt='admin'
            style={{width: 50, height: 50, borderRadius: 20}}
            />
            <Text style={{color: 'black', fontFamily: 'serif', fontSize: 20}}>Transport Head</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('UserLogin')}
        style = {styles.touch}>
        <Image 
            source={require('../assets/worker.png')}
            alt='admin'
            style={{width: 50, height: 50, borderRadius: 20}}
            />
            <Text style={{color: 'black', fontFamily: 'serif', fontSize: 20}}>User</Text>
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
    backgroundColor: `rgba(110,100,110,0.3)`,
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
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000000'
  },
  touch: {
    backgroundColor: `rgba(100,130,110,0.7)`,
    width: 315,
    alignSelf: 'center',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 20,
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 15,
    paddingVertical: 8
  }
})

export default Intro