
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';
import FoldersDisplay from './components/FoldersViewer/FoldersDisplay'
const Stack = createStackNavigator();

export default function App() {
  const [editing, setEditing] = useState(false)

  return (
    <PaperProvider>   
      <NavigationContainer>
        <Stack.Navigator>

        <Stack.Screen
            name="Folders"
            component={FoldersDisplay}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

 );
}
