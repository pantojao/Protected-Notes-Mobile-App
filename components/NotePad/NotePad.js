import React, {useState} from 'react' 
import styles from './NotePadStyles'
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';

const NotePad = ({navigation}) => {
    const [notes, setNotes] = useState("")
    const [editing, setEditing] = useState(false)
    
    return (
        <View style={styles.notesView}>
            <Button onPress={() => setEditing(!editing)} title="press"/>
            {editing ? 
                <TextInput 
                style={styles.textInput}
                multiline={true}
                placeholder="Type here"
                onChangeText={text => setNotes(text)}
                defaultValue={notes} />
                :
                <Text>{notes}</Text>
            }
        </View>
    )
}



export default NotePad