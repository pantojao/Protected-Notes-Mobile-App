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
import styles from "./NotesDisplayStyles";
import { UserNotes } from "../../UserNotes";

export const NewNotePortal = ({addNewNote, hideDialog}) => {
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

export const NoteOptions = ({
  noteName,
  hideModal,
  editNoteName,
  deleteThis,
  moveNote,
}) => {
  const [showingEdit, setShowingEdit] = useState(false);
  const [showingMove, setShowingMove] = useState(false);
  const hideEditMenu = () => setShowingEdit(false);
  const showEditMenu = () => setShowingEdit(true);
  const hideMoveMenu = () => setShowingMove(false);
  const showMoveMenu = () => setShowingMove(true);

  return (
    <>
      {showingEdit && (
        <EditNamePortal
          editNoteName={editNoteName}
          hideEditMenu={hideEditMenu}
        />
      )}
      {showingMove && (
        <MoveNotePortal moveNote={moveNote} hideMoveMenu={hideMoveMenu} />
      )}

      <Portal>
        <Modal
          visible={true}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Text style={{ fontSize: 15, marginBottom: 15 }}>{noteName}</Text>
          <Button onPress={showEditMenu} mode="outlined">
            Edit Name
          </Button>
          <Button onPress={showMoveMenu} mode="outlined">
            Move Note
          </Button>
          <Button
            onPress={deleteThis}
            style={{ marginTop: 15 }}
            color="red"
            dark={true}
            mode="contained"
          >
            Delete Note
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

const EditNamePortal = ({ editNoteName, hideEditMenu }) => {
  const [newName, setNewName] = useState("");
  console.log(hideEditMenu, editNoteName);

  return (
    <Portal>
      <Dialog visible={true} onDismiss={hideEditMenu} style={styles.editNoteName}>
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
//ajsdfkljasidofdasjalsdkfjasdlkjflaksdjfliasdjfasdqweiojhnasdklf newsjynqbievwtbynvksa Urivbyewvrtwe4i
const MoveNotePortal = ({ moveNote, hideMoveMenu }) => {
  const [location, setLocation] = useState("");
  const { userData } = useContext(UserNotes);

  return (
    <Portal>
      <Dialog
        visible={true}
        onDismiss={hideMoveMenu}
       
      >
        <Dialog.ScrollArea>
          <ScrollView>
            <RadioButton.Group
              onValueChange={(newValue) => setLocation(newValue)}
              value={location}
            >
              {userData.folders.map((folder) => (
                <RadioButton.Item
                  key={folder.folder_id}
                  label={folder.folder_name}
                  value={folder.folder_id}
                />
              ))}

            </RadioButton.Group>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideMoveMenu}>Cancel</Button>
          <Button onPress={() => moveNote(location)}>Move</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
