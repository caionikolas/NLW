import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

SplashScreen.preventAutoHideAsync();

import Home from './src/pages/Home'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <View>
        <Home />
        <StatusBar style='dark' backgroundColor='transparent' translucent/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color:"#000",
  }
});
