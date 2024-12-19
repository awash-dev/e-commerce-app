import UseCart from '@/store/CartStore';
import { View, StyleSheet, Image, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import "@/global.css";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const Cart = () => {
  const navigation = useNavigation(); // Initialize navigation
  const items = UseCart((state) => state.items); // Accessing cart items from Zustand store
  const resetCart = UseCart((state) => state.resetCart);
  const updateQuantity = UseCart((state) => state.updateQuantity); // Assume this function exists in your store

  // Calculate total price considering quantity
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Final payment integrations
  const Checkout = async () => {
    // Add any additional checkout logic here, such as API calls
    resetCart(); // Reset the cart after checkout
    console.log("Checkout successful! Cart has been reset."); // Logging for debugging
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? ( // Check if the cart is empty
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id} // Ensure each item has a unique key
          contentContainerStyle={{ gap: 10 }} // Set gap between items
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: `http://localhost:3000/img/${item.product.image}` }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemPrice}>{(item.product.price * item.quantity).toFixed(2)} Birr</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)} Birr</Text>
        {items.length > 0 && ( // Show checkout button only if there are items in the cart
          <Button
            title="Checkout"
            onPress={Checkout} // Trigger checkout function
            color="#007BFF" // Customize button color
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
    flexDirection: 'column', // Stack details vertically
    justifyContent: 'flex-start', // Align items to the start
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#007BFF',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
