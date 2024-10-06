import React, { useEffect, useState } from 'react';
import { Image, View, Alert } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from './HomeScreen';
import { ref, update, remove } from 'firebase/database'; 
import { dbRealTime } from '../config/firebaseConfig';

export const DetailProductScreen = () => {
  const route = useRoute();
  //@ts-ignore 
  const { product } = route.params;

  const navigation = useNavigation();

  const [formEdit, setFormEdit] = useState<Product>({
    id: '',
    code: '',
    imagen: '',
    nameProduct: '',
    description: '',
    price: 0,
    stock: 0
  });

  useEffect(() => {
    setFormEdit(product);
  }, [product]);

  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  const handleUpdateProduct = async () => {
    const dbRef = ref(dbRealTime, 'products/' + formEdit.id); 
    await update(dbRef, {
      code: formEdit.code,
      imagen: formEdit.imagen,
      nameProduct: formEdit.nameProduct,
      description: formEdit.description,
      price: formEdit.price,
      stock: formEdit.stock
    });
    navigation.goBack();
  };

  const handleDeleteProduct = async () => {
    const dbRef = ref(dbRealTime, 'products/' + formEdit.id); 

    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await remove(dbRef); 
            navigation.goBack(); 
          }
        }
      ]
    );
  };

  return (
    <View style={styles.editContainer}>
      <Card style={styles.editCard}>
        <View style={styles.cardContent2}>
          <Image
            source={{ uri: formEdit.imagen }}
            style={styles.editProductImage}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>ID:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.id}
              editable={false}
            />

            <Text style={styles.labelText}>Código:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.code}
              onChangeText={(value) => handleSetValues('code', value)}
            />

            <Text style={styles.labelText}>URL de la Imagen:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.imagen}
              onChangeText={(value) => handleSetValues('imagen', value)}
            />

            <Text style={styles.labelText}>Nombre del Producto:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.nameProduct}
              onChangeText={(value) => handleSetValues('nameProduct', value)}
            />

            <Text style={styles.labelText}>Descripción:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.description}
              onChangeText={(value) => handleSetValues('description', value)}
            />

            <Text style={styles.labelText}>Precio:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.price.toString()}
              onChangeText={(value) => handleSetValues('price', value)}
              keyboardType="numeric"
            />

            <Text style={styles.labelText}>Stock:</Text>
            <TextInput
              style={styles.inputField}
              value={formEdit.stock.toString()}
              onChangeText={(value) => handleSetValues('stock', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.actionButtonContainer}>
            <IconButton
              icon="content-save"
              iconColor="white"
              size={30}
              mode="contained"
              style={styles.saveButton}
              onPress={handleUpdateProduct}
            />
            <IconButton
              icon="delete"
              iconColor="white"
              size={30}
              mode="contained"
              style={styles.deleteButton}
              onPress={handleDeleteProduct} 
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
  