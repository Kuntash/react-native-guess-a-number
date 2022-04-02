import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // source={{
          //   uri: 'https://sp-images.summitpost.org/821930.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=532128b126efc1c4686216cf705c00e4',
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed
          <Text style={styles.highlight}> {props.roundsNumber} </Text>
          to guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
});
export default GameOverScreen;
