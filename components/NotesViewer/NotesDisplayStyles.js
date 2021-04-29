import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  notePreviews: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: 'center', 
    marginVertical: 10,
  },
  noteCard: {
    marginHorizontal: 15,
    marginVertical: 25,
    width: '28%',
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
    height: "80%",
    width: "80%",
    alignSelf: "center",
  },
});

export default styles;
