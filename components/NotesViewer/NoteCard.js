import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Card, Modal, Portal, Text } from "react-native-paper";
import styles from "./NotesDisplayStyles";
import * as Haptics from "expo-haptics";

const NotesCard = ({ noteId, note, folderId }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const showModal = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const openNotePad = () => {
    Haptics.selectionAsync();
    navigation.navigate("NotePad", {
      noteId: noteId,
      folderId: folderId,
      name: note.note_name,
    });
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Text>{note.note_content}</Text>
        </Modal>
      </Portal>

      <Card
        style={styles.noteCard}
        onPress={openNotePad}
        onLongPress={showModal}
        elevation={2}
      >
        <Card.Title
          titleStyle={{
            fontSize: 15,
          }}
          title={note.note_name}
        />
      </Card>
    </>
  );
};

export default NotesCard;
