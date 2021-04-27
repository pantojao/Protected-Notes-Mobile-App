import React, {useState} from 'react' 
import styles from './NotePadStyles'
import {Text, View} from 'react-native';

const NotePreview = ({content}) => {
    return (
        <View style={styles.notesPreview}>
            <Text>{content}</Text>
        </View>
    )
}

export default NotePreview
