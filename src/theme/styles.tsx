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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E88E5',  
    borderRadius: 50,
    elevation: 5, 
  },
  fabIcon: {
    color: 'white',
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
containerStyle: {
  backgroundColor: '#333',
  padding: 20,
  marginHorizontal: 20,
  borderRadius: 10,
  elevation: 5, 
},
modalContent: {
  alignItems: 'center',
  backgroundColor: '#333',
},
modalTitle: {
  fontSize: 22,
  color: '#333',
  fontWeight: 'bold',
  marginBottom: 20,
},
inputModal: {
  width: '100%', 
  marginBottom: 15,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
},
divider: {
  width: '100%',
  height: 1,
  marginBottom: 20,
},
closeButton: {
  backgroundColor: '#0A4595',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginTop: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
},
card: {
  margin: 15,
  borderRadius: 10,
  elevation: 5, 
  backgroundColor: '#fff',
},
cardContent: {
  flexDirection: 'row', 
  alignItems: 'center',
  padding: 10,
},
productImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginRight: 15,
},
textContent: {
  flex: 1, 
},
productName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 5,
},
productDescription: {
  fontSize: 14,
  color: '#666',
  marginBottom: 5,
},
productPrice: {
  fontSize: 16,
  color: '#0A4595', 
},
iconContainer: {
  marginLeft: 10,
  justifyContent: 'center',
},
iconButton: {
  backgroundColor: '#0A4595', 
  borderRadius: 50, 
},
});
