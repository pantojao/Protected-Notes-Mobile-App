import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  notePreviews: {
    alignSelf: "center",
    justifyContent: 'center', 
    width: '95%',
    marginVertical: 10,
  },
  noteCard: {
    marginVertical: 10, 
    width: '100%',
    height: 80,
  },
  searchbar: {
    height: 60, 
    width: '95%', 
    marginVertical: 10,
    alignSelf: 'center'
},
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "40%",
    width: "70%",
    justifyContent: "center", 
    alignItems: "center", 
    alignSelf: "center",
  },
  editNoteName:{
    height: 250
  }, 
  portalOptionsTitle: {
    fontSize: 15, marginBottom: 15
  }, 
  noteOptionsBtns: {
    width: 175,
    marginVertical: 10
  }

});

export default styles;
