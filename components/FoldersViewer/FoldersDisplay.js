import React, { useContext } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Folder from "./Folder";
import {UserNotes} from '../../UserNotes'
import styles from './FolderStyles'

const FoldersDisplay = ({ navigation }) => {
  const {folders, setFolders} = useContext(UserNotes)

  React.useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => 
              <Button icon="plus" /> 
         })
  }, [navigation])

  return (
    <View style={styles.folderDisplay}>
      <View style={styles.folderActions}>
       <TextInput label="Search" style={styles.searchbar}/>
      </View>
     
      {folders.map((folder) => (
        <Folder  key={folder.id} folder={folder} />
      ))}
    </View>
  );
};

export default FoldersDisplay;
