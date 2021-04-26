import React, {useState} from 'react' 
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';
import styles from './NotesDisplayStyles'
import NotesPreview from './NotePreview'

const NotesDisplay = ({navigation}) => {
    const notes = {name: "Passwords", notes: [{noteName: "All My Pass", noteContent: "345gasd3q"}, {noteName: "Instagram", noteContent: "345gasd3q"}, {noteName: "Facebook", noteContent: "345gasd3q"}]}
    return (
      <>
        <Text style={styles.noteTitle}>{notes.name}</Text>
        <View style={styles.notePreviews}>
            {notes.notes.map((note) => <NotesPreview key={note.noteName} name={note.noteName}/>)}
        </View>
      </>
    )
 }


export default NotesDisplay