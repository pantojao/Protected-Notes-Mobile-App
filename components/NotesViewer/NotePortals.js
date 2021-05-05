import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Modal,
  Portal,
} from "react-native-paper";
import styles from "./NotesDisplayStyles";


export const NewNotePortal = (addNewNote, hideDialog) => {
  const [newNote, setNewNote] = useState("");

  return (
    <Portal>
      <Dialog visible={true} onDismiss={hideDialog}>
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
          <Button onPress={() => addNewNote(newNote)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export const NoteOptions = ({hideModal, editNoteName, deleteThis, moveNote}) => {
    const [showingEdit, setShowingEdit] = useState(false)
 

    const hideEditMenu = () => setShowingEdit(false)
    const showEditMenu = () => setShowingEdit(true)
    console.log(hideModal)
  return (
    <>
    {showingEdit && <EditNamePortal editNoteName={editNoteName} hideEditMenu={hideEditMenu} />}
    <Portal>
      <Modal
        visible={true}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <Button onPress={showEditMenu}>Edit Name</Button>
        <Button onPress={deleteThis}>Delete Note</Button>
      </Modal>
    </Portal>
    </>
  );
};

const EditNamePortal = ({editNoteName, hideEditMenu}) => {
  const [newName, setNewName] = useState("")
   console.log(hideEditMenu, editNoteName)
  return (
    <Portal>
      <Dialog visible={true} onDismiss={hideEditMenu}>
        <Dialog.Title>Change Note Name</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Enter New Name</Paragraph>
          <TextInput
            label="Search"
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideEditMenu}>Cancel</Button>
          <Button onPress={() => editNoteName(newName)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
