import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    width: "100%",
    textAlign: "center",
  },
  notesView: {
    height: "100%",
    width: "100%",
  },
  textInput: {
    height: "100%",
    width: "90%",
    alignSelf: 'center', 
  },
  noteContent: {
    height: '100%', 
    width: '90%', 
    alignSelf: 'center', 
  }, 
  notesPreview: {
    maxWidth: '100%', 
    maxHeight: '100%',
    fontSize: 1, 
  }
});

export default styles;
