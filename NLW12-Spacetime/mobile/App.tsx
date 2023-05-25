import { StatusBar } from 'expo-status-bar';
import {ImageBackground, View } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBG from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/nlw-spacetime-logo.svg'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
      <ImageBackground
        source={blurBG}
        className='flex-1 items-center bg-gray-900'
        imageStyle={{
          position: 'absolute',
          left: '-115%'
        }}
      >



        <View className='flex-1 items-center justify-center gap-6'>
        </View>

        <StatusBar style="light" translucent />
      </ImageBackground>
  );
}

