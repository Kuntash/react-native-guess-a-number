import React from 'react';
import { View, StyleSheet } from 'react-native';
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    // Shadow property works only on ios
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    // Elevation only works on android
    elevation: 5,
  },
});

export default Card;
