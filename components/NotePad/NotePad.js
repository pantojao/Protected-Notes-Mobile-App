import React, { useState, useContext } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const NotePad = ({ route, navigation }) => {
  const { folders, setFolders } = useContext(UserNotes);
  const [note, setNote] = useState(null);
  const [noteName, setNoteName] = useState (null); 
  const [noteContent, setNoteContent] = useState(null)
  const [editing, setEditing] = useState(false);

  React.useLayoutEffect(() => {
    const currentNote = folders[route.params.folderId].notes[route.params.noteId]
    setNote(currentNote);
    setNoteName(currentNote.noteName)
    setNoteContent(currentNote.noteContent)
    navigation.setOptions({title: "", headerRight: () => <Button onPress={() => saveContent()} title="save" /> });
  }, [navigation]);

  const saveContent = () => {
    note.noteContent = noteContent
    note.noteName = noteName
    let newFolder = folders
    newFolder[route.params.folderId].notes[route.params.noteId] = note
    setFolders(newFolder)
    console.log("saved")
  }

  return (
    <View style={styles.notesView}>

      <Text>{route.params.name}</Text>
    
     {editing ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Type here"
          onChangeText={(text) => setNoteContent(text)}
          defaultValue={noteContent}
        />
      ) : (
        <Text onPress={() => setEditing(!editing)}>{noteContent}</Text>
      )} 
    </View>
  );
};

export default NotePad;
