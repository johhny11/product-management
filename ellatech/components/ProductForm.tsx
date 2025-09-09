import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import "../global.css";

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: Date;
}

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

export default function ProductForm({ onAddProduct }: ProductFormProps) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = () => {
    if (!sku || !name || !price || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert("Price must be a postive number");
      return;
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      alert("Quantity must be a positive number");
      return;
    }

    const newProduct = {
      id: Date.now(),
      sku,
      name,
      price: parsedPrice,
      quantity: parsedQuantity,
      lastUpdated: new Date(),
    };

    onAddProduct(newProduct);

    // Clear form
    setSku("");
    setName("");
    setPrice("");
    setQuantity("");
    alert("Product added successfully");
  };

  return (
    <View>
      <Text>Product Form</Text>
      <TextInput
        className="border border-gray-300 mb-2 rounded"
        placeholder="SKU"
        value={sku}
        onChangeText={setSku}
      />
      <TextInput
        className="border border-gray-300 mb-2 rounded"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-300 mb-2 rounded"
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        className="border border-gray-300 mb-2 rounded"
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded"
        onPress={handleAddProduct}
      >
        <Text className="text-white font-bold text-center">Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}
