import React from 'react'
import {List} from 'react-native-paper'
import styles from './FolderStyles'

const Folder = ({name, amount}) => {
    return (
        <List.Item 
            style={styles.folderItem}
            title={name}
            right={() => <List.Icon icon="arrow-right" />}
            
        />
    )
}

export default Folder
