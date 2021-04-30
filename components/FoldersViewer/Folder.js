import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {List, Card} from 'react-native-paper'
import styles from './FolderStyles'
import * as Haptics from 'expo-haptics';

const Folder = ({folder}) => {
    const navigation = useNavigation();

    const goToFolder = () => {
        Haptics.selectionAsync()
        navigation.navigate('NotesDisplay', {
            folderId: folder.id,
            name: folder.name
        })
    }

    return (
        <Card elevation={2} style={styles.folderItem} onPress={goToFolder}>
            <Card.Title title={folder.name} right={() => <List.Icon icon="arrow-right"/>}/>
        </Card>
   )
}

export default Folder
        // <List.Item
        //     style={styles.folderItem}
        //     title={folder.name}
        //     onPress={goToFolder}
        //     right={() => <List.Icon icon="arrow-right"/>}
        // />
 