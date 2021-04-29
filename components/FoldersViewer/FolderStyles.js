import React from 'react';
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    folderDisplay:{
        marginVertical: 10
    }, 
    folderItem: {
        width: '95%', 
        alignSelf: 'center',
        height: 70,
        marginVertical: 5
    },
    folderActions: {
       width: '95%', 
       alignSelf: 'center', 
       display: 'flex', 
       flexDirection: 'row', 
       alignItems: 'center',
    },
    searchbar: {
        height: 60, 
        width: '95%',
        alignSelf: 'center', 
        marginVertical: 10
    },

})

export default styles