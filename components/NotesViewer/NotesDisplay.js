import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import * as Haptics from "expo-haptics";
import styles from "./NotesDisplayStyles";
import NoteCard from "./NoteCard";
import { UserNotes } from "../../UserNotes";

const NotesDisplay = ({ route, navigation }) => {
  const { userData } = useContext(UserNotes);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentDisplay, setCurrentDisplay] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  React.useLayoutEffect(() => {
    const current = userData.folders.find(
      (folder) => folder.folder_id === route.params.folderId
    );
    setCurrentFolder(current);
    setCurrentDisplay(Object.entries(current.notes));
    
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="plus"
          onPress={showDialog}
          mode="text"
          labelStyle={{ fontSize: 25 }}
        />
      ),
      title: route.params.name,
    });
  }, [navigation]);

  useEffect(() => {
    if (currentFolder === null) return;
    let display = Object.entries(currentFolder.notes);
    let searchString = search.trim().toLowerCase();

    if (!searchString.length) {
      setCurrentDisplay(display);
      return;
    }

    display = display.filter(([key, note]) =>
      note.note_name.toLowerCase().match(searchString)
    );
    setCurrentDisplay(display);

  }, [search]);

  const showDialog = () => {
    Haptics.selectionAsync();
    setVisible(true);
  };

  const addNote = () => {
    console.log(newNote);
    hideDialog();
  };

  const hideDialog = () => {
    setVisible(false);
    setNewNote("");
  };

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Note</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Enter name for your new note.</Paragraph>
            <TextInput
              label="Search"
              value={newNote}
              onChangeText={(text) => setNewNote(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addNote}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TextInput
        label="Search"
        style={styles.searchbar}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {currentDisplay && (
        <View style={styles.notePreviews}>
          {currentDisplay.map(([key, note]) => (
            <NoteCard
              key={key}
              noteId={key}
              note={note}
              folderId={route.params.folderId}
            />
          ))}
        </View>
      )}
    </>
  );
};

export default NotesDisplay;
