import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, IconButton, Portal, Modal, Button, Divider, TextInput, FAB } from 'react-native-paper';
import { styles } from '../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import firabase from '@firebase/auth'
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProductComponent } from './components/NewProductComponent';

interface FormUser{
  name: string,
}

interface Product{
  id: string,
  code: string,
  imagen: string,
  nameProduct: string,
  description: string,
  price: number,
  stock: number
}
export const HomeScreen = () => {

  const [formUser, setFormUser] = useState<FormUser>({
    name:"",
  });

  const [userData, setUserData] = useState<firabase.User | null >(null)

  const [products, setProducts] = useState<Product[]>([
    {id: '1', code: 'CH001', imagen: 'https://images.footballfanatics.com/chelsea/chelsea-cup-nike-home-stadium-shirt-2024-25-with-caicedo-25-printing_ss5_p-201964580+pv-1+u-jcclxlhnmpfv8buvxkao+v-nix0zrfmfodfuct2245m.jpg?_hv=2&w=900',
    nameProduct:'CAMISA LOCAL CHELSEA 2024', description:'Camiseta del chelsea local 2024',price:120, stock:100
    },
    {id: '2', code: 'CH002', imagen: 'https://images.footballfanatics.com/chelsea/chelsea-nike-away-stadium-shirt-2024-25-with-njackson-15-printing_ss5_p-201963727+pv-1+u-ci7odoxn8tgsz6j2waau+v-uddlck5tntkryovsi5bg.jpg?_hv=2&w=900',
    nameProduct:'CAMISA VISITANTE CHELSEA 2024', description:'Camiseta del chelsea visitante 2024',price:120, stock:100
    }
   ])

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalProduct, setShowModalProduct] = useState<boolean>(false)

  useEffect(()=>{
    setUserData(auth.currentUser);
    setFormUser({name: auth.currentUser?.displayName ?? ''})
  },[])

  const handleSetValues=(key:string, value:string)=>{
    setFormUser({...formUser, [key]: value})
  }
const handleUpdateUser = async ()=>{
  try{
    await updateProfile(userData!,
      {displayName: formUser.name});
  }catch(e){
    console.log(e)
  }
  
  setShowModalProfile(false);
}

  return (
    <>
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <IconButton icon="account" size={40} color="black" />
          <View style={styles.userText}>
            <Text style={styles.userName}>Bienvenido</Text>
            <Text style={styles.userName}>{userData?.displayName}</Text>
            <Text style={styles.userEmail}>{userData?.email}</Text>
          </View>
        </View>


        <IconButton 
          icon="pencil"
          size={30}
          color="black"  
          style={styles.editButton} 
          onPress={()=>setShowModalProfile(true)}
        />
      </View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCardComponent/>}
        keyExtractor={item => item.id}
        
      />

    </View>
    <Portal>
      <Modal 
        visible={showModalProfile} 
        onDismiss={() => setShowModalProfile(false)} 
        contentContainerStyle={styles.containerStyle}
      >
        <View>
        <IconButton 
          icon="close-circle-outline"
          size={30}
          color="black"  
          style={styles.editButton} 
          onPress={()=>setShowModalProfile(false)}
        />
        </View>
        
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Mi Perfil</Text>
          <Divider style={styles.divider}/>
          

          <TextInput 
            label="Nombre" 
            style={styles.inputModal}
            underlineColor="transparent"
            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
            value={formUser.name}
            onChangeText={(value)=>handleSetValues('name', value)}
          />
          <TextInput  
            label="Correo" 
            style={styles.inputModal}
            disabled
            underlineColor="transparent"
            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
            value={userData?.email!}
          />
      

          <Button 
            mode="contained" 
            onPress={handleUpdateUser} 
            style={styles.closeButton} 
            labelStyle={styles.buttonText}
          >
            Actualizar
          </Button>
        </View>
      </Modal>
    </Portal>
    <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => setShowModalProduct(true)}
  />
  <NewProductComponent showModalProduct={showModalProduct} setShowModalProduct={setShowModalProduct}/>
  </>
  );
}
