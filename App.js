import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class App extends React.Component {
  constructor() {
    super();
  }

  state = {
    text: "",
    word: "",
    definition: "",
    lexicalCategory: "",
    isSearchPressed: false,
  };

  getWord = (word) => {
    var searchKeyword = word.toLowerCase().trim()
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json";

    return fetch(url)
      .then((data) => {
        if (data.status == 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;

        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            "word": this.state.text,
            "definition": definition,
            "lexicalCategory": lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: "Not found",
          });
        }
      });
  };

  render() {
    return (
      <SafeAreaProvider>
        <Header
          centerComponent={{
            text: "Dictionary",
            style: { fontWeight: "bold", fontSize: 20 },
          }}
        />

        <View style={{ alignItems: "center", marginTop: 250 }}>
          <TextInput
            placeholder="Enter a word"
            placeholderTextColor="black"
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 150,
              borderWidth: 3,
              borderColor: "midnightblue",
            }}
            onChangeText={(text) => {
              this.setState({
                isSearchPressed: false,
                text: text,
                word: "Loading...",
              });
            }}
            value={this.state.text}
          />

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                this.setState({ isSearchPressed: true });
                this.getWord(this.state.text);
              }}
            >
              <Text>Search</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 30, marginTop: 30 }}>
            Word:{this.state.word}
          </Text>

          <Text style={{ fontSize: 24, marginTop: 30 }}>
            Type: {this.state.lexicalCategory}
          </Text>

          <Text style={{ fontSize: 24, marginTop: 30 }}>
            Definition: {this.state.definition}
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

var styles = StyleSheet.create({
  searchButton: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "powderblue",
  },
});
