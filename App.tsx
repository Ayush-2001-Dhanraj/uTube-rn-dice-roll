import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {trigger} from 'react-native-haptic-feedback';
import React, {useState} from 'react';

import Dice1 from './assets/1.png';
import Dice2 from './assets/2.png';
import Dice3 from './assets/3.png';
import Dice4 from './assets/4.png';
import Dice5 from './assets/5.png';
import Dice6 from './assets/6.png';

const diceImages: ImageSourcePropType[] = [
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
];

type DiceProps = {
  imageSource: ImageSourcePropType;
};

const Dice = ({imageSource}: DiceProps): JSX.Element => {
  return <Image source={imageSource} style={styles.dice} />;
};

const App = () => {
  const [currentFace, setCurrentFace] = useState<ImageSourcePropType>(Dice1);

  const handleDiceRoll = () => {
    const choice = Math.floor(Math.random() * 6);
    setCurrentFace(diceImages[choice]);
    trigger('impactLight');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Dice imageSource={currentFace} />
      <TouchableOpacity style={styles.btn} onPress={handleDiceRoll}>
        <Text style={styles.rollTxt}>Roll</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  dice: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  rollTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  btn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 8,
  },
});
