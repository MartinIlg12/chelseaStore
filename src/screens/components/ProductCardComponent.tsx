import React from 'react';
import { Image, View } from 'react-native';
import { IconButton, Text, Card, Button } from 'react-native-paper';
import { styles } from '../../theme/styles';


export const ProductCardComponent = () => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/36/eb/0b/36eb0bae6624f1a4cb593c4b03499b76.jpg' }}
          style={styles.productImage}
        />

        <View style={styles.textContent}>
          <Text style={styles.productName}>Camiseta Chelsea</Text>
          <Text style={styles.productDescription}>Camiseta oficial del Chelsea FC</Text>
          <Text style={styles.productPrice}>$79.99</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton
            icon="magnify"
            iconColor="white"
            size={30}
            mode="contained"
            style={styles.iconButton}
            onPress={() => console.log('pressed')}
          />
        </View>
      </View>
    </Card>
  );
};
