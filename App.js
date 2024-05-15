
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import React from 'react'
import Intro from './Front_Pages/Intro'
import Home from './Front_Pages/Home'
import UserLogin from './User_Pages/UserLogin'
import UserMain from './User_Pages/UserMain'
import AdminLogin from './Admin_Pages/AdminLogin'
import AdminMain from './Admin_Pages/AdminMain'
import ManagerLogin from './Manager_Pages/ManagerLogin'
import ManagerMain from './Manager_Pages/ManagerMain'
import TransportLogin from './Transport/TransportLogin'
import TransportMain from './Transport/TransportMain'
import Assign_Car from './Front_Pages/Assign_Car'

const navigation = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <navigation.Navigator initialRouteName='Intro'>
        <navigation.Screen name="Home" component={Home} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name="Intro" component={Intro} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name="UserLogin" component={UserLogin} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='UserMain' component={UserMain} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='AdminLogin' component={AdminLogin} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='AdminMain' component={AdminMain} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='ManagerLogin' component={ManagerLogin} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='ManagerMain' component={ManagerMain} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='transportLogin' component={TransportLogin} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='transportMain' component={TransportMain} options={{title: 'Vehicle Tracker'}}/>
        <navigation.Screen name='Assign' component={Assign_Car} options={{title: 'Vehicle Tracker'}}/>
        </navigation.Navigator>
    </NavigationContainer>
  )
}

export default App