import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, IconButton, Portal, Modal, Button, Divider, TextInput, FAB } from 'react-native-paper';
import { styles } from '../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dbRealTime } from '../config/firebaseConfig';
import firabase from '@firebase/auth'
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProductComponent } from './components/NewProductComponent';
import { onValue, ref } from 'firebase/database';

interface FormUser{
  name: string,
}

export interface Product{
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
   ])

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalProduct, setShowModalProduct] = useState<boolean>(false)

  useEffect(()=>{
    setUserData(auth.currentUser);
    setFormUser({name: auth.currentUser?.displayName ?? ''})
    getAllProduct();
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
const getAllProduct = () =>{
  const dbRef = ref(dbRealTime, 'products');
  onValue(dbRef, (snapshot)=>{
    const data= snapshot.val();
    const getKeys= Object.keys(data);
    const listProduct: Product[] = [];
    getKeys.forEach((key)=>{
      const value={...data[key], id:key}
      listProduct.push(value);
    });
    setProducts(listProduct);
  })
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
        renderItem={({item}) => <ProductCardComponent product={item}/>}
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
