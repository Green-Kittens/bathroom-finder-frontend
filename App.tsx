import NavBar from './navigation/navbar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/stackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
