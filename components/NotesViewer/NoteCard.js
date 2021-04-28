import React, { useState } from "react";
import { View} from "react-native";
import { useNavigation } from '@react-navigation/core';
import {Card, Modal, Portal } from "react-native-paper";
import styles from "./NotesDisplayStyles";
import NotePreview from '../NotePad/NotePreview'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NotesCard = ({ note, folderId }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation(); 
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const openNotePad = () => {
    navigation.push("NotePad", {
      noteId: note.id,
      folderId: folderId, 
      name: note.noteName
    })
  }

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle} >
          <NotePreview content={note.noteContent} />
        </Modal>
      </Portal>

      <Card style={styles.noteCard} onPress={openNotePad} onLongPress={showModal} elevation={2}>
          <SkeletonPlaceholder>
            <View style={{ width: "100%", height: "100%"}} />
          </SkeletonPlaceholder>
        <Card.Title titleStyle={{ fontSize: 10 }} title={note.noteName} />
      </Card>

    </>

  );
};

export default NotesCard;



        {/* <SkeletonPlaceholder>
          <View style={{ width: "100%", height: 100 }} />
        </SkeletonPlaceholder> */}