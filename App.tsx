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

interface DimInterface {
  height: number;
  width: number;
}

const Dice = ({imageSource}: DiceProps): JSX.Element => {
  return <Image source={imageSource} style={styles.dice} />;
};

const App = () => {
  const [currentFace, setCurrentFace] = useState<ImageSourcePropType>(Dice1);
  const [containerDim, setContainerDim] = useState<DimInterface>({
    height: 0,
    width: 0,
  });
  const [currentTexts, setCurrentTexts] = useState<Array<JSX.Element>>([]);

  const getTextComponent = (num: number) => {
    let color = '#';
    const choices = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++)
      color += choices[Math.floor(Math.random() * choices.length)];
    const fontSize = Math.floor(Math.random() * 45) + 20;
    const top = Math.random() * (containerDim.height - fontSize);
    const left = Math.random() * (containerDim.width - fontSize);

    return (
      <Text
        style={[
          styles.randomTxt,
          {
            fontSize,
            color,
            left,
            top,
          },
        ]}>
        {num}
      </Text>
    );
  };

  const addNumberRandomly = (num: number) => {
    const currText = getTextComponent(num);
    setCurrentTexts(preV => [...preV, currText]);
  };

  const handleDiceRoll = () => {
    const choice = Math.floor(Math.random() * 6);
    setCurrentFace(diceImages[choice]);
    trigger('impactLight');
    addNumberRandomly(choice + 1);
  };

  return (
    <SafeAreaView
      style={styles.container}
      onLayout={event => {
        const {height, width} = event.nativeEvent.layout;
        setContainerDim({height, width});
      }}>
      <Dice imageSource={currentFace} />
      <TouchableOpacity style={styles.btn} onPress={handleDiceRoll}>
        <Text style={styles.rollTxt}>Roll</Text>
      </TouchableOpacity>
      {currentTexts.map((Comp, i) => {
        return React.cloneElement(Comp, {key: i});
      })}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  dice: {
    height: 150,
    width: 150,
    borderRadius: 10,
    zIndex: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
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
    zIndex: 100,
  },
  randomTxt: {
    position: 'absolute',
  },
});
