import React, {useState, useContext, useEffect} from 'react' 
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper'
import styles from './NotesDisplayStyles'
import NoteCard from './NoteCard'
import { UserNotes } from '../../UserNotes';

const NotesDisplay = ({route, navigation}) => {
  const {folders} = useContext(UserNotes)
  const [currentFolder, setCurrentFolder] = useState(null)

  React.useLayoutEffect(() => {
    const currentNotes = folders.find((folder) => folder.id === route.params.folderId)
    setCurrentFolder(currentNotes)
    navigation.setOptions({
        headerRight: () => 
            <Button icon="plus"/>
     , title: route.params.name})
  }, [navigation])

    return currentFolder ? (
        <View style={styles.notePreviews}>
            {currentFolder.notes.map((note) => <NoteCard key={note.id} note={note} folderId={route.params.folderId}/> )}
        </View>
    ) : null
 }


export default NotesDisplay