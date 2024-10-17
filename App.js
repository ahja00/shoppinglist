import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import { firestore, collection, addDoc, tuoteluettelo, getDocs, serverTimestamp, doc, deleteDoc } from './firebase/Config.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function App() {
  const [newProduct, setNewProduct] = useState('');
  const [products, setProducts] = useState([]);

 
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(firestore, tuoteluettelo));
    const productsList = [];
    querySnapshot.forEach((doc) => {
      productsList.push({ id: doc.id, ...doc.data() });
    });
    setProducts(productsList);
  };

  
  const save = async () => {
    await addDoc(collection(firestore, tuoteluettelo), {
      name: newProduct,
      created: serverTimestamp()
    }).catch(error => console.log(error));

    setNewProduct('');
    console.log('Product saved.');
    await fetchProducts();
  };


  const deleteProduct = async (id) => {
    await deleteDoc(doc(firestore, tuoteluettelo, id)).catch(error => console.log(error));
    console.log('Product deleted.');
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Add product...'
          value={newProduct}
          onChangeText={text => setNewProduct(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={save}>
          <Text style={styles.buttonText}>Lisää</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productText}>{item.name}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
              <Text style={styles.buttonText}>Poista</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'pink',
    padding: 10, 
    borderRadius: 5,
    marginLeft: 10, 
  },
  deleteButton: {
    backgroundColor: 'pink', 
    padding: 10, 
    borderRadius: 5, 
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
  },
});