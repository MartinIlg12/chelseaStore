import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { styles } from '../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

interface UserAuth{
  name: string,
  email: string
}

export const HomeScreen = () => {

  const [userAuth, setUserAuth] = useState<UserAuth>({
    name:"",
    email:""
  });

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUserAuth({name: user.displayName ?? 'NA' , email: user.email ?? 'NA'})
      }
    })
  },[])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <IconButton icon="account" size={40} color="black" />
          <View style={styles.userText}>
            <Text style={styles.userName}>{userAuth.name}</Text>
            <Text style={styles.userEmail}>{userAuth.email}</Text>
          </View>
        </View>


        <IconButton 
          icon="pencil"
          size={30}
          color="black"  
          style={styles.editButton} 
        />
      </View>


      <Image 
        source={{ uri: 'https://wallpapers.com/images/hd/chelsea-iphone-g36mar1ajwwf1gfi.jpg' }} 
        style={styles.logo} 
      />


      <Text style={styles.welcomeText}>¡Bienvenido a Chelsea Store!</Text>


      <Text style={styles.description}>
        Explora los últimos kits, mercancías y mucho más de Chelsea. ¡Prepárate para la temporada y apoya a los Blues!
      </Text>
    </View>
  );
}
