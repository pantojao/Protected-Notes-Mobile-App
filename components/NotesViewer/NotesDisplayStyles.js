import React from 'react';
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    notePreviews:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center', 
        marginVertical:20
    },
    noteCard: {
        marginHorizontal: 5,
        width: '30%',
        height: 100
    },
    cardTitle: {
        fontSize: 1
    },
    containerStyle: {
    backgroundColor: "lightblue",
    padding: 20,
    height: "80%",
    width: "80%",
    alignSelf: "center",
  },
})

export default styles