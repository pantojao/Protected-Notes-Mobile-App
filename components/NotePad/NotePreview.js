import React, {useState} from 'react' 
import styles from './NotePadStyles'
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';

const NotePreview = ({text}) => {
    return (
        <View style={styles.notesView}>
            <Text>{text}</Text>
        </View>
    )
}

export default NotePreview
