import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {List} from 'react-native-paper'
import styles from './FolderStyles'

const Folder = ({folder}) => {
    const navigation = useNavigation();

    const goToFolder = () => {
        navigation.navigate('NotesDisplay', {
            noteId: folder.id,
            name: folder.name
        })
    }

    return (
        <List.Item 
            style={styles.folderItem}
            title={folder.name}
            onPress={goToFolder}
            right={() => <List.Icon icon="arrow-right"/>}
        />
    )
}

export default Folder
