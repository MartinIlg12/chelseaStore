import React, { useState } from 'react'
import { Button, Dialog, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { View } from 'react-native'
import { dbRealTime } from '../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';

interface Props {
    showModalProduct: boolean;
    setShowModalProduct: Function;
}
interface ShowMessage {
    visible: boolean;
    message: string;
    message2: string;
}

interface FormProduct {
    id: string,
    code: string,
    imagen: string,
    nameProduct: string,
    description: string,
    price: number,
    stock: number
}

export const NewProductComponent = ({ showModalProduct, setShowModalProduct }: Props) => {

    const [formProduct, setFormProduct] = useState<FormProduct>({
        id: '',
        code: '',
        imagen: '',
        nameProduct: '',
        description: '',
        price: 0,
        stock: 0
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        message2: ""
    });

    const [dialogVisible, setDialogVisible] = useState(false);

    const handleSetValues = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value })
    }

    const handleCloseDialog = () => {
        setDialogVisible(false);
        setShowMessage({ ...showMessage, visible: false });
    };

    const handleSaveProduct = async () => {
        const dbRef = ref(dbRealTime, 'products');
        const saveProduct = push(dbRef);

        try {
            await set(saveProduct, formProduct);
            // Mostrar mensaje de éxito
            setShowMessage({
                visible: true,
                message: 'El producto ha sido agregado con éxito.',
                message2: 'Producto Agregado'
            });
            // Cerrar modal
            setShowModalProduct(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Portal>
                <Modal
                    visible={showModalProduct}
                    onDismiss={() => setShowModalProduct(false)}
                    contentContainerStyle={styles.containerStyle}
                >
                    <View>
                        <IconButton
                            icon="close-circle-outline"
                            size={30}
                            color="black"
                            style={styles.editButton}
                            onPress={() => setShowModalProduct(false)}
                        />
                    </View>

                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nuevo Producto</Text>
                        <Divider style={styles.divider} />
                        <TextInput
                            label="Id Camisa"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('imagen', value)}
                        />
                        <TextInput
                            label="Código Camisa"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('imagen', value)}
                        />
                        <TextInput
                            label="Url de la Imagen"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('imagen', value)}
                        />
                        <TextInput
                            label="Nombre"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('nameProduct', value)}
                        />
                        <TextInput
                            label="Descripción"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            multiline
                            numberOfLines={3}
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('description', value)}
                        />
                        <TextInput
                            label="Precio"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            keyboardType='numeric'
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('price', value)}
                        />
                        <TextInput
                            label="Stock"
                            style={styles.inputModal}
                            underlineColor="transparent"
                            keyboardType='numeric'
                            theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                            onChangeText={(value) => handleSetValues('price', value)}
                        />

                        <Button
                            mode="contained"
                            style={styles.closeButton}
                            onPress={handleSaveProduct}
                            labelStyle={styles.buttonText}
                        >
                            Agregar
                        </Button>
                    </View>
                </Modal>
            </Portal>
            <Portal>
                <Dialog visible={showMessage.visible} onDismiss={handleCloseDialog}>
                    <Dialog.Title>{showMessage.message2}</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>{showMessage.message}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleCloseDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}
