import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontFamily: 'Avenir',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginTop: 20,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  dialogText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    marginTop: 20,
    color: 'black', 
    textAlign: 'center', 
    fontSize: 16, 
    textDecorationLine: 'underline', 
},

rootActivity: {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  
},

container: {
  flex: 1,
  backgroundColor: 'black', 
  padding: 20,
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
userInfo: {
  flexDirection: 'row',
  alignItems: 'center',
},
userText: {
  marginLeft: 10,
},
userName: {
  fontSize: 16,
  color: '#fff',
  fontWeight: 'bold',
},
userEmail: {
  fontSize: 14,
  color: '#fff',
},
editButton: {
  marginRight: 0, 
},
logo: {
  width: 150,
  height: 150,
  alignSelf: 'center',
  marginBottom: 20,
},
welcomeText: {
  fontSize: 24,
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},
description: {
  fontSize: 16,
  color: '#fff',
  textAlign: 'center',
  paddingHorizontal: 20,
},
});
