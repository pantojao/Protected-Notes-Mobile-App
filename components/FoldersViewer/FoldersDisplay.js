import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Folder from "./Folder";
import styles from './FolderStyles'

const FoldersDisplay = ({ navigation }) => {
  const folders = [
    { name: "All Notes", numberOfNotes: 5 },
    { name: "Passwords", numberOfNotes: 3 },
    { name: "Personal", numberOfNotes: 2 },
  ];


  return (
    <View style={styles.folderDisplay}>
      <View style={styles.folderActions}>
       <TextInput label="Search" style={styles.searchbar}/>
       <Button icon="plus">Add Folder</Button>
      </View>
     
      {folders.map((folder) => (
        <Folder key={folder.name} name={folder.name} amount={folder.numberOfNotes} />
      ))}
    </View>
  );
};

export default FoldersDisplay;
