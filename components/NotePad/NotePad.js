import React, { useState, useContext, useEffect } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const NotePad = ({ route, navigation }) => {
  const { userData, setUserData } = useContext(UserNotes);
  const [noteContent, setNoteContent] = useState(null);
  const [editing, setEditing] = useState(false);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerRight: () => <Button onPress={() => saveContent()} title="Done" />,
    });
  }, [navigation]);

  useEffect(() => {
    if (!userData) return;
    const currentNote = userData.folders.find(
      (folder) => folder.folder_id === route.params.folderId
    )["notes"][route.params.noteId];

    if (noteContent === null) setNoteContent("")
    else setNoteContent(currentNote.note_content);
    console.log(currentNote.note_content);
  }, [isFocused]);

  const saveContent = async () => {
    console.log(noteContent, "clicked");
    if (noteContent == null) return;

    const path = `notes.${[route.params.noteId]}.note_content`;
    await userData["user_reference"]
      .collection("Folders")
      .doc(route.params.folderId)
      .update({
        [path]: noteContent,
      });
  };

  const onChangeText = (text) => {
    console.log(text);
    setNoteContent(text)
  }

  return (
    <View style={styles.notesView}>
      {editing ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Type here"
          onChangeText={(text) =>{onChangeText(text)}}
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
