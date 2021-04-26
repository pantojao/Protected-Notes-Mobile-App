
import React, {useState} from 'react';
import NotePad from './components/NotePadFolder/NotePad.js'
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import NotesDisplay from './components/NotesViewer/NotesDisplay'

const Stack = createStackNavigator();

export default function App() {
  const [editing, setEditing] = useState(false)
 
  // const createNote = () => {

  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Notes"
          component={NotesDisplay}
          options={{ title: 'Overview' }}
        />

        <Stack.Screen 
          name="Home"
          component={NotePad}
        />

       

  
      </Stack.Navigator>
    </NavigationContainer>


 );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: 'red',
    color:'red'
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  