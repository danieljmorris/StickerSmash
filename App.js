import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Button from './Components/Button';
import ImageViewer from './Components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from './Components/CircleButton';
import IconButton from './Components/IconButton';
import EmojiPicker from './Components/EmojiPicker';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
const [isModalVisible, setIsModalVisible] = useState(false);  
const [showAppOptions, setShowAppOptions] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  } else {
    alert('You did not select an image.');
  }
};

const onReset = () => {
  setShowAppOptions(false);
};

const onSaveImageAsync = async () => {

};

const onAddSticker = () => {
  setIsModalVisible(true);
};

const onModalClose = () => {
  setIsModalVisible(false);
}


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? ( 
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View> )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}></EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
