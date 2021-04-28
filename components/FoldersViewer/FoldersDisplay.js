import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, Button,  Paragraph, Dialog, Portal } from "react-native-paper";
import Folder from "./Folder";
import {UserNotes} from '../../UserNotes'
import styles from './FolderStyles'

const FoldersDisplay = ({ navigation }) => {
  const {folders, setFolders} = useContext(UserNotes)
  const [visible, setVisible] = useState(false); 
  const [newFolder, setNewFolder] = useState("")
  
  React.useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => 
              <Button icon="plus" onPress={showDialog}/> 
         })
  }, [navigation])

  const showDialog = () => setVisible(true);

  const addFolder = () => {
      console.log(newFolder)
      hideDialog()
  }
  
  const hideDialog = () => {
    setVisible(false);
    setNewFolder("")
  }


  return (
    <View style={styles.folderDisplay}>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Folder</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Enter name for your new folder.</Paragraph>
            <TextInput label="Search" value={newFolder} onChangeText={(text) => setNewFolder(text)}/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addFolder}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.folderActions}>
       <TextInput label="Search" style={styles.searchbar}/>
      </View>
      {Object.entries(folders).map(([id, folder]) => (
        <Folder key={id} folder={folder} />
      ))}
      
    </View>
  );
};

export default FoldersDisplay;
