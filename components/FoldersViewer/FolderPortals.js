import React, { useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Modal,
  Portal,
  Menu,
  RadioButton,
} from "react-native-paper";
import styles from "./FolderStyles";
import { UserNotes } from "../../UserNotes";

export const FolderOptions = ({
  folder,
  renameFolder,
  deleteThis,
  hideModal,
}) => {
    const [showingEdit, setShowingEdit] = useState(false)

  return (

    <Portal>
     
      <Modal
        visible={true}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        {showingEdit && <RenameFolderPortal renameFolder={renameFolder} hideModal={hideModal} />}
        <Text style={{ fontSize: 15 }}>{folder.folder_name}</Text>
        <Button onPress={() => setShowingEdit(true)} mode="outlined">
          Rename Folder
        </Button>
        <Button onPress={deleteThis} color="red" dark={true} mode="contained">
          Delete Folder
        </Button>
      </Modal>
    </Portal>
  );
};

const RenameFolderPortal = ({renameFolder, hideModal }) => {
  const [newName, setNewName] = useState("");

  return (
    <Portal>
      <Dialog visible={true} onDismiss={hideModal}>
        <Dialog.Title>Change Folder Name</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Enter New Name</Paragraph>
          <TextInput
            label="Search"
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideModal}>Cancel</Button>
          <Button onPress={() => renameFolder(newName)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
