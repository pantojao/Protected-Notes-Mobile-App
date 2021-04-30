import React, { useState } from "react";
import { View, Vibration } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Card, Modal, Portal, Text } from "react-native-paper";
import styles from "./NotesDisplayStyles";
import * as Haptics from "expo-haptics";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NotesCard = ({ note, folderId }) => {
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
      noteId: note.id,
      folderId: folderId,
      name: note.noteName,
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
          <Text>{note.noteContent}</Text>
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
          title={note.noteName}
          
        />
      </Card>
    </>
  );
};

export default NotesCard;

{
  /* <Card.Content style={{ maxWidth: '100%', width: "100%", height: "100%"}}>
            <SkeletonPlaceholder speed={2000}>
              <View style={{ maxWidth: "100%", width: 200, height: 28}} />
            </SkeletonPlaceholder>
          </Card.Content> */
}
