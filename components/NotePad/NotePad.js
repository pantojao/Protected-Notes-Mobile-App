import React, { useState, useContext } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const NotePad = ({ route, navigation }) => {
  const { folders, setFolders } = useContext(UserNotes);
  const [note, setNote] = useState(null);
  const [noteName, setNoteName] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const [editing, setEditing] = useState(false);

  React.useLayoutEffect(() => {
    const currentNote = folders.folders
      .find((folder) => folder.folder_id === route.params.folderId)
      .notes.find((note) => note.note_id === route.params.noteId);

    setNote(currentNote);
    setNoteName(currentNote.note_name);
    setNoteContent(currentNote.note_content);

    navigation.setOptions({
      title: route.params.name,
      headerRight: () => <Button onPress={() => saveContent()} title="Done" />,
    });
    
  }, [navigation]);

  const saveContent = () => {
    if (noteContent === null || note) return;
    note.noteContent = noteContent;
    note.noteName = noteName;
    let newFolder = folders;
    newFolder[route.params.folderId].notes[route.params.noteId] = note;
    setFolders(newFolder);
    console.log("saved");
  };

  return (
    <View style={styles.notesView}>
      {editing ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Type here"
          onChangeText={(text) => setNoteContent(text)}
          defaultValue={noteContent}
        />
      ) : (
        <Text style={styles.noteContent} onPress={() => setEditing(!editing)}>
          {noteContent}
        </Text>
      )}
    </View>
  );
};

export default NotePad;
