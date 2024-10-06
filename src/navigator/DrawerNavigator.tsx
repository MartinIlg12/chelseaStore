import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { styles } from '../theme/styles';
import { DetailProductScreen } from '../screens/DetailProductScreen';

interface Routes {
  name: string;
  screen: React.ComponentType<any>; 
}

const Drawer = createDrawerNavigator();


const routesNoAuth: Routes[] = [
  { name: 'Login', screen: LoginScreen },
  { name: 'Registro', screen: RegisterScreen }
];


const routesAuth: Routes[] = [
  { name: 'Home', screen: HomeScreen },
  { name: 'Detalles', screen: DetailProductScreen }
];

export const DrawerNavigator = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator animating={true} size='large' color="blue" />
        </View>
      ) : (
        <Drawer.Navigator>
          {!isAuth ? (
            routesNoAuth.map((item, index) => (
              <Drawer.Screen key={index} name={item.name} component={item.screen} />
            ))
          ) : (
            routesAuth.map((item, index) => (
              <Drawer.Screen 
                key={index} 
                name={item.name} 
                component={item.screen}
                options={{
                  headerShown: item.name !== 'Home',  
                  swipeEnabled: item.name !== 'Home',  
                  drawerType: item.name === 'Home' ? 'back' : 'front'  
                }}
              />
            ))
          )}
        </Drawer.Navigator>
      )}
    </>
  );
};
