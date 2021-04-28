import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    folderDisplay:{
        marginVertical: 20
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
        flexGrow: 2,
        marginVertical: 5
    }
})

export default styles