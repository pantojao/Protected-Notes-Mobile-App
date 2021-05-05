import { useNavigation } from "@react-navigation/core";
import React, {useState, useContext} from "react";
import {deleteFolder} from '../../handleData'
import { List, Card, Modal, Portal, Button, Text } from "react-native-paper";
import styles from "./FolderStyles";
import * as Haptics from "expo-haptics";
import { UserNotes } from "../../UserNotes";

const Folder = ({ folder }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {userData, setUserData} = useContext(UserNotes)
  const showModal = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const deleteThis = async () => {
    console.log(folder, folder.folder_id)
    await deleteFolder(folder.folder_id, userData, setUserData);
    hideModal();
  };

  const goToFolder = () => {
    Haptics.selectionAsync();
    navigation.navigate("NotesDisplay", {
      folderId: folder.folder_id,
      name: folder.folder_name,
    });
  };

  return (
    <>
    <Portal>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
      <Button>Edit Name</Button>
      <Button>Move Note</Button>
      <Button onPress={deleteThis}>Delete Note</Button>

    </Modal>
  </Portal>

    <Card elevation={2} style={styles.folderItem} onLongPress={showModal} onPress={goToFolder}>
      <Card.Title
        title={folder.folder_name}
        right={() => <List.Icon icon="arrow-right" />}
      />
    </Card>
    </>
  );
};

export default Folder;
