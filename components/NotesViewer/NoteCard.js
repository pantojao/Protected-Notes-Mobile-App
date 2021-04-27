import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Modal, Portal, Provider } from "react-native-paper";
import styles from "./NotesDisplayStyles";
import NotePreview from '../NotePad/NotePreview'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NotesCard = ({ note }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: 'red', padding: 20, height: '80%', width:'80%', alignSelf: 'center' }; 
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
          <NotePreview text="asdfhasdfkjh" />
        </Modal>
      </Portal>

      <Card style={styles.noteCard} onLongPress={showModal}>
        <SkeletonPlaceholder>
          <View style={{ width: "100%", height: 100 }} />
        </SkeletonPlaceholder>
        <Card.Title titleStyle={{ fontSize: 10 }} title={note.noteName} />
      </Card>

    </>

  );
};

export default NotesCard;
