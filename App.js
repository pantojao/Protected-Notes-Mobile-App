import React, { useState, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, Button } from "react-native-paper";
import FoldersDisplay from "./components/FoldersViewer/FoldersDisplay";
import NotesDisplay from "./components/NotesViewer/NotesDisplay";
import NotePad from "./components/NotePad/NotePad";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import { UserNotes } from "./UserNotes";
import * as firebase from "firebase";

import { Text } from "react-native";
const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyD8ZvWx_uMqFy7RV1cPiGyucWcHG2uAIVw",
  authDomain: "passwordnotes-8c7df.firebaseapp.com",
  projectId: "passwordnotes-8c7df",
  storageBucket: "passwordnotes-8c7df.appspot.com",
  messagingSenderId: "475930463775",
  appId: "1:475930463775:web:092bbff5ba87def9fa8f2a",
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function App() {
  const [folders, setFolders] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        return;
      }

      setLoggedIn(true);
      getData();
    });
  }, []);

  const getData = async () => {
    const userData = { folders: [] };
    try {
      //   const docRef = db.collection("users").doc("FAsiWsTTogRLES4FfNfUYCDKOTA3");
      //   const doc = await docRef.get();
      //   const folders = await doc.ref.collection("Folders").get();

      //   folders.forEach(async (folder) => {
      //     let currentFolder = {};
      //     const folderName = folder.data().name;
      //     const notes = await folder.ref.collection("Notes").get();

      //     currentFolder[folderName] = [];

      //     notes.forEach((note) => {
      //       const noteData = note.data();
      //       currentFolder[folderName].push({
      //         note_id: note.note_id,
      //         note_name: noteData.note_name,
      //         note_content: noteData.note_content,
      //       });
      //     });

      //     userData["folders"].push(currentFolder);
      // });
      setFolders(data);
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  const providerValue = useMemo(() => ({ folders, setFolders }), [
    folders,
    setFolders,
  ]);

  return !loggedIn ? (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <UserNotes.Provider value={providerValue}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Folders" component={FoldersDisplay} />
            <Stack.Screen name="NotesDisplay" component={NotesDisplay} />
            <Stack.Screen
              name="NotePad"
              component={NotePad}
              options={{ headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserNotes.Provider>
  );
}

const data = {
  folders: [
    {
      folder_name: "All Notes",
      folder_id: 1, 
      notes: [
        { note_id: 1, note_name: "All My Pass", note_content: "345gasd3q" },
        { note_id: 2, note_name: "Instagram", note_content: "345gasd3q" },
        { note_id: 3, note_name: "Facebook", note_content: "345gasd3q" },
      ],
    },
    {
      folder_name: "Passwords",
      folder_id: 2, 
      notes: [
        { note_id: 1, note_name: "All My Pass", note_content: "345gasd3q" },
        { note_id: 2, note_name: "Instagram", note_content: "345gasd3q" },
        { note_id: 3, note_name: "Facebook", note_content: "345gasd3q" },
        { note_id: 5, note_name: "Instagram", note_content: "345gasd3q" },
        { note_id: 6, note_name: "Facebook", note_content: "345gasd3q" },
      ],
    },
    {
      folder_name: "Personal",
      folder_id: 3,
      notes: [
        { note_id: 1, note_name: "PersonalOne", note_content: "345gasd3q" },
        { note_id: 2, note_name: "PersonalTwo", note_content: "345gasd3q" },
        { note_id: 3, note_name: "PersonalThree", note_content: "345gasd3q" },
      ],
    },
  ],
};

{
  /* <Stack.Screen name="Folders" component={FoldersDisplay} />
            <Stack.Screen name="NotesDisplay" component={NotesDisplay} />
            <Stack.Screen name="NotePad" component={NotePad} options={{headerBackTitleVisible: false}}/> */
}

// <UserNotes.Provider value={providerValue}>
//    <PaperProvider>
//     <Stack.Screen name="Folders" component={FoldersDisplay} />
//     <Stack.Screen name="NotesDisplay" component={NotesDisplay} />
//     <Stack.Screen
//       name="NotePad"
//       component={NotePad}
//       options={{ headerBackTitleVisible: false }}
//     />
//   </PaperProvider>
// </UserNotes.Provider>
