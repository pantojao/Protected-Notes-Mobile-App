import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import FoldersDisplay from "./components/FoldersViewer/FoldersDisplay";
import NotesDisplay from "./components/NotesViewer/NotesDisplay";
import NotePad from "./components/NotePad/NotePad";
import { UserNotes } from "./UserNotes";

const Stack = createStackNavigator();

export default function App() {
  const [folders, setFolders] = useState(data);
  const providerValue = useMemo(() => ({ folders, setFolders }), [
    folders,
    setFolders,
  ]);

  return (
    <UserNotes.Provider value={providerValue}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Folders" component={FoldersDisplay} />
            <Stack.Screen name="NotesDisplay" component={NotesDisplay} />
            <Stack.Screen name="NotePad" component={NotePad} options={{headerBackTitleVisible: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserNotes.Provider>
  );
}

const data = {
  1: {
    id: 1,
    name: "All Notes",
    numberOfNotes: 5,
    notes: {
      1: { id: 1, noteName: "All My Pass", noteContent: "345gasd3q" },
      2: { id: 2, noteName: "Instagram", noteContent: "345gasd3q" },
      3: { id: 3, noteName: "Facebook", noteContent: "345gasd3q" },
    },
  },
  2: {
    id: 2,
    name: "Passwords",
    numberOfNotes: 3,
    notes: {
      1: { id: 1, noteName: "All My Pass", noteContent: "345gasd3q" },
      2: { id: 2, noteName: "Instagram", noteContent: "345gasd3q" },
      3: { id: 3, noteName: "Facebook", noteContent: "345gasd3q" },
      5: { id: 5, noteName: "Instagram", noteContent: "345gasd3q" },
      6: { id: 6, noteName: "Facebook", noteContent: "345gasd3q" },
    },
  },
  3: {
    id: 3,
    name: "Personal",
    numberOfNotes: 2,
    notes: {
      1: { id: 1, noteName: "PersonalOne", noteContent: "345gasd3q" },
      2: { id: 2, noteName: "PersonalTwo", noteContent: "345gasd3q" },
      3: { id: 3, noteName: "PersonalThree", noteContent: "345gasd3q" },
    },
  },
};
