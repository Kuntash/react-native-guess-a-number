import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min) + min);
  if (randNum === exclude) return generateRandomBetween(min, max, exclude);
  return randNum;
};
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
  </View>
);
const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(
    1,
    100,
    props.userChoice
  ).toString();
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't, lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
    setCurrentGuess(nextNumber);
  };
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Opponent's Guess </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  listItem: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listContainer: {
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
    flex: 1,
  },
});

export default GameScreen;
