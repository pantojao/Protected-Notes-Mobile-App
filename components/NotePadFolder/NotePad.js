import React, {useState} from 'react' 
import styles from './NotePadStyles'
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';

const NotePad = ({navigation}) => {
    const [notes, setNotes] = useState("")
    const [title, setTitle] = useState("Passwords")
    
    return (
        <View style={styles.notesView}>
            <Text style={styles.title}>{title}</Text>

            <Button title="Go Back" onPress={(() => navigation.navigate('NotesDisplay'))} />
            <TextInput 
            style={styles.textInput}
            multiline={true}
            placeholder="Type here"
            onChangeText={text => setNotes(text)}
            defaultValue={notes}
            />
        </View>
    )
}



export default NotePad