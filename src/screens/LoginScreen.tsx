import React, { useState } from 'react'
import { View, ImageBackground } from 'react-native'
import { Button, Dialog, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface FormLogin {
    email: string,
    password: string
}


//interface
interface ShowMessage {
    visible: boolean;
    message: string;
    message2: string;
}

//

export const LoginScreen =  () => {
    //use state
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email:"",
        password:""
    });
    const [dialogVisible, setDialogVisible] = useState(false);

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        message2: ""
    });

const handleSetValues=(key: string, value: string)=>{
    setFormLogin({...formLogin, [key]: value})
}

const handleSignIn = async () =>{
    if(!formLogin.email || !formLogin.password){
        setShowMessage({ visible: true, message: 'Contraseña o correo incorrecto', message2: "¡ERROR AL INICIAR SESIÓN!" }); // Mostrar diálogo cuando hay campos vacíos
        return;
    }
    console.log(formLogin);
    try {
        const response = await signInWithEmailAndPassword(
            auth,
            formLogin.email,
            formLogin.password
        );
        console.log(response)
    } catch (e) {
        console.log(e);
        setShowMessage({
            visible: true,
            message: "Contraseña o correo incorrecto",
            message2: "¡ERROR AL INICIAR SESIÓN!"
        });
    }
}

//ver contraseña
const [hidenPassword, setHidenPassword] = useState<boolean>(true)
const handleCloseDialog = () => {
    setDialogVisible(false);
    setShowMessage({ ...showMessage, visible: false }); // Ocultar mensaje al cerrar el diálogo
};

const navigation = useNavigation();

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/36/eb/0b/36eb0bae6624f1a4cb593c4b03499b76.jpg' }}
            style={styles.background}
        >
            <View style={styles.root}>
                <Text style={styles.text}>Inicia Sesión</Text>

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
                    onPress={handleSignIn}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Inicia Sesión
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
                <Text style={styles.linkText} onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Registro'}))}>No tienes una cuenta? Regístrate Ahora</Text>

            </View>
        </ImageBackground>
    );
}
