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
    const currentNotes = folders[route.params.folderId]
    console.log(Object.entries(currentNotes.notes), "-----------------")
    setCurrentFolder(currentNotes)
    navigation.setOptions({
        headerRight: () => 
            <Button icon="plus"/>
     , title: route.params.name})
  }, [navigation])

    return currentFolder!==null ? (
        <View style={styles.notePreviews}>
            {Object.entries(currentFolder.notes).map(([id, note]) => <NoteCard key={id} note={note} folderId={route.params.folderId}/> )}
        </View>
    ) : null
 }


export default NotesDisplay