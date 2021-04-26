import React, {useState} from 'react' 
import {View} from 'react-native';
import {Text, Card, Title} from 'react-native-paper';
import styles from './NotesDisplayStyles'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const NotesPreview = ({name}) => {
    return (
      <Card style = {styles.noteCard}>
        <SkeletonPlaceholder>
            <View style={{ width: '100%', height: 100 }} />
        </SkeletonPlaceholder>
        <Card.Title titleStyle={{fontSize: 10}} title={name} />
     </Card>
    )
 }


export default NotesPreview