
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';
import FoldersDisplay from './components/FoldersViewer/FoldersDisplay'
import NotesDisplay from './components/NotesViewer/NotesDisplay'
import NotePad from './components/NotePad/NotePad'
const Stack = createStackNavigator();

export default function App() {
  const [editing, setEditing] = useState(false)

  return (
    <PaperProvider>   
      <NavigationContainer>
        <Stack.Navigator>

        <Stack.Screen
            name="Folders"
            component={NotePad}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

 );
}
