import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './/navigation/navbar';
import { useFonts } from 'expo-font';
import { setCustomText } from 'react-native-global-props';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    'EudoxusSans-Regular': require('./assets/fonts/EudoxusSans-Regular.ttf'),
    'EudoxusSans-Bold': require('./assets/fonts/EudoxusSans-Bold.ttf'),
    'EudoxusSans-ExtraBold': require('./assets/fonts/EudoxusSans-ExtraBold.ttf'),
    'EudoxusSans-Light': require('./assets/fonts/EudoxusSans-Light.ttf'),
    'EudoxusSans-ExtraLight': require('./assets/fonts/EudoxusSans-ExtraLight.ttf'),
    'EudoxusSans-Medium': require('./assets/fonts/EudoxusSans-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }
  
  const customTextProps = {
    style: {
      fontSize: 16,
      fontFamily: 'EudoxusSans-Regular',
      color: 'black'
    }
  };

  setCustomText(customTextProps);

  
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
