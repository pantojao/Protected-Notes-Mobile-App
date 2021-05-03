import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {List, Card} from 'react-native-paper'
import styles from './FolderStyles'
import * as Haptics from 'expo-haptics';

const Folder = ({folder}) => {
    const navigation = useNavigation();

    console.log(folder)
    const goToFolder = () => {
        Haptics.selectionAsync()
        navigation.navigate('NotesDisplay', {
            folderId: folder.folder_id,
            name: folder.folder_name
        })
    }

    return (
        <Card elevation={2} style={styles.folderItem} onPress={goToFolder}>
            <Card.Title title={folder.folder_name} right={() => <List.Icon icon="arrow-right"/>}/>
        </Card>
   )
}

export default Folder

 