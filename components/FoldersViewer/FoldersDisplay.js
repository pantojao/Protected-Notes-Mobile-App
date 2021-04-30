import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import Folder from "./Folder";
import { UserNotes } from "../../UserNotes";
import styles from "./FolderStyles";
import * as Haptics from 'expo-haptics';


const FoldersDisplay = ({ navigation }) => {
  const { folders, setFolders } = useContext(UserNotes);
  const [currentDisplay, setCurrentDisplay] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [search, setSearch] = useState("");

  React.useLayoutEffect(() => {

    setCurrentDisplay(Object.entries(folders));
    navigation.setOptions({
      headerRight: () => <Button icon="plus"  mode="text" labelStyle={{ fontSize: 25 }} onPress={showDialog} />,
    });

  }, [navigation]);

  useEffect(() => {

    if (!folders) return;
    let display = Object.entries(folders);
    let searchString = search.trim().toLowerCase();

    if (!searchString.length) setCurrentDisplay(display);

    if (searchString.length) {
      display = display.filter(([id, folder]) =>
        folder.name.toLowerCase().match(searchString)
      );
      setCurrentDisplay(display);
    }
  }, [search]);

  const showDialog = () =>{ 
    Haptics.selectionAsync()
    setVisible(true);
  }

  const addFolder = () => {
    console.log(newFolder);
    
    hideDialog();
  };

  const hideDialog = () => {
    setVisible(false);
    setNewFolder("");
  };

  return (
    <>
      <TextInput
        label="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
        style={styles.searchbar}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Folder</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Enter name for your new folder.</Paragraph>
            <TextInput
              label="Search"
              value={newFolder}
              onChangeText={(text) => setNewFolder(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addFolder}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {currentDisplay && (
        <View style={styles.folderDisplay}>
          {currentDisplay.map(([id, folder]) => (
            <Folder key={id} folder={folder} />
          ))}
        </View>
      )}
    </>
  );
};

export default FoldersDisplay;
