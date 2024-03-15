import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './/navigation/navbar';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'EudoxusSans-Regular': require('./assets/fonts/EudoxusSans-Regular.ttf'),
    'EudoxusSans-Bold': require('./assets/fonts/EudoxusSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null
  }
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
