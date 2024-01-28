import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { COLOR, icons } from "../constants";

const SearchScreen = ({ searchTerm, setSearchTerm, handleClick }) => {
  return (
    <View>
      <TextInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Pressable onClick={handleClick}>
        <Text>{{searchTerm}}</Text>
      </Pressable>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
