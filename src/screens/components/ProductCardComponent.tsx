import React from 'react';
import { Image, View } from 'react-native';
import { IconButton, Text, Card, Button } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { Product } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props{
  product: Product;
}

export const ProductCardComponent = ({product}:Props) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image
           source={{ uri: product.imagen }}
          style={styles.productImage}
        />

        <View style={styles.textContent}>
          <Text style={styles.productName}>{product.nameProduct}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton
            icon="magnify"
            iconColor="white"
            size={30}
            mode="contained"
            style={styles.iconButton}
            onPress={() => navigation.dispatch(CommonActions.navigate({name: 'Detalles', params:{product}}))}
          />
        </View>
      </View>
    </Card>
  );
};
