import React from 'react';
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    noteTitle:{
        textAlign: 'center', 
        marginVertical: 10,
        fontSize: 20
    }, 
    notePreviews:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    noteCard: {
        marginHorizontal: 5,
        width: '30%'
    },
    cardTitle: {
        fontSize: 1
    }
    

})

export default styles