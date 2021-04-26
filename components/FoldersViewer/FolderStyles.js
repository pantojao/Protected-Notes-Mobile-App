import React from 'react';
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    folderDisplay:{
    }, 
    folderItem: {
        width: '95%', 
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,  
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
        flexGrow: 1
    }
})

export default styles