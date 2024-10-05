import React, { useState } from 'react'
import { View, ImageBackground } from 'react-native'
import { Button, Dialog, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface
interface FormRegister {
    email: string,
    password: string
}

//interface
interface ShowMessage {
    visible: boolean;
    message: string;
    message2: string;
}

export const RegisterScreen = () => {

    // Estado para controlar el formulario
    const [formRegister, setformRegister] = useState<FormRegister>({
        email: "",
        password: ""
    });

    // Estado para controlar el diálogo (alerta)
    const [dialogVisible, setDialogVisible] = useState(false);

    // Estado para controlar el mensaje (Snackbar)
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        message2: ""
    });

    // Función para actualizar los valores del formulario
    const handleSetValues = (key: string, value: string) => {
        setformRegister({ ...formRegister, [key]: value });
    };
 const navigation = useNavigation();
    // Función para manejar el registro
    const handleRegister = async () => {
        if (!formRegister.email || !formRegister.password) {
            setShowMessage({ visible: true, message: 'Completa todos los campos', message2: "¡ERROR!" }); // Mostrar diálogo cuando hay campos vacíos
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );

            setShowMessage({
                visible: true,
                message2: "Registrado",
                message: "Registrado con éxito"
            });
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: "Error al registrarse",
                message2: "¡ERROR!"
            });
        }
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setDialogVisible(false);
        setShowMessage({ ...showMessage, visible: false }); // Ocultar mensaje al cerrar el diálogo
    };

    //ver contraseña
    const [hidenPassword, setHidenPassword] = useState<boolean>(true)

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/4c/f6/2c/4cf62c68868ed43c60a0c5aebe6b67c2.jpg' }}
            style={styles.background}
        >
            <View style={styles.root}>
                <Text style={styles.text}>Regístrate</Text>

                <TextInput
                    label="Email"
                    mode="flat"
                    placeholder='Escribe tu correo'
                    style={styles.input}
                    underlineColor="transparent"
                    theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                    onChangeText={(value) => handleSetValues('email', value)}
                />

                <TextInput
                    label="Contraseña"
                    mode="flat"
                    placeholder='Escribe tu contraseña'
                    secureTextEntry={hidenPassword}
                    style={styles.input}
                    underlineColor="transparent"
                    theme={{ colors: { text: '#fff', primary: '#fff', placeholder: '#ccc' } }}
                    onChangeText={(value) => handleSetValues('password', value)}
                    right={<TextInput.Icon icon="eye" onPress={()=>setHidenPassword(!hidenPassword)}/>}
                />

                <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Registrarse
                </Button>

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
                <Text style={styles.linkText} onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Login'}))}>Ya tienes una cuenta? Inicia Sesión Ahora</Text>
            </View>
        </ImageBackground>
    );
}
