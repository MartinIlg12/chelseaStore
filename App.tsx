import 'react-native-gesture-handler';
import React from 'react'
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { PaperProvider } from 'react-native-paper';



export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <DrawerNavigator/>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App;