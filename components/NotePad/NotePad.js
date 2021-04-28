import React, { useState, useContext } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const NotePad = ({ route, navigation }) => {
  const { folders } = useContext(UserNotes);
  const [notes, setNotes] = useState(null);
  const [editing, setEditing] = useState(false);

  React.useLayoutEffect(() => {
    const currentNote = folders
      .find((folder) => folder.id === route.params.folderId)
      .notes.find((note) => note.id === route.params.noteId);
    setNotes(currentNote);
    navigation.setOptions({ title: route.params.name });
  }, [navigation]);

  return (
    <View style={styles.notesView}>
    <Button onPress={() => setEditing(!editing)} title="press" />
      {editing ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Type here"
          onChangeText={(text) => setNotes(text)}
          defaultValue={notes}
        />
      ) : (
        <Text>{notes}</Text>
      )} 
    </View>
  );
};

export default NotePad;
