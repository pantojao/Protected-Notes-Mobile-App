import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, Paragraph, Dialog, Modal, Portal } from "react-native-paper";
import styles from "./FolderStyles";

export const FolderOptions = ({ folder, renameFolder, deleteThis, hideModal }) => {
    const [showingEdit, setShowingEdit] = useState(false);

    return (
        <Portal>
            <Modal visible={true} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                {showingEdit && <RenameFolderPortal renameFolder={renameFolder} hideModal={hideModal} />}
                <Text style={styles.portalName}>{folder.folder_name}</Text>
                <Button onPress={() => setShowingEdit(true)} style={styles.portalActions} mode="outlined">
                    Rename Folder
                </Button>
                <Button onPress={deleteThis} style={styles.portalActions} color="red" dark={true} mode="contained">
                    Delete Folder
                </Button>
            </Modal>
        </Portal>
    );
};

const RenameFolderPortal = ({ renameFolder, hideModal }) => {
    const [newName, setNewName] = useState("");

    return (
        <Portal>
            <Dialog visible={true} onDismiss={hideModal} style={styles.nameFolder}>
                <Dialog.Title>Change Folder Name</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Enter New Name</Paragraph>
                    <TextInput label="Name" value={newName} autoCorrect={false} onChangeText={(text) => setNewName(text)} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideModal}>Cancel</Button>
                    <Button onPress={() => renameFolder(newName)}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export const AddFolderPortal = ({ addNewFolder, hideDialog }) => {
    const [newFolder, setNewFolder] = useState("");

    return (
        <Portal>
            <Dialog visible={true} onDismiss={hideDialog} style={styles.nameFolder}>
                <Dialog.Title>New Folder</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Enter name for your new folder.</Paragraph>
                    <TextInput label="Search" value={newFolder} autoCorrect={false} onChangeText={(text) => setNewFolder(text)} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={() => addNewFolder(newFolder)}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
