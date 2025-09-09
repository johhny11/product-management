import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Product } from "./ProductForm";
// import { Product } from "../../components/ProductForm";

export interface Transaction {
  id: number;
  productId: number;
  type: "add" | "remove";
  quantityChanged: number;
  timestamp: Date;
}

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product, transaction: Transaction) => void;
}

export default function ProductList({
  products,
  onUpdateProduct,
}: ProductListProps) {
  const [quantityChanges, setQuantityChanges] = useState<{
    [key: number]: string;
  }>({});

  const handleStockChange = (product: Product, type: "add" | "remove") => {
    const changeStr = quantityChanges[product.id];
    const change = parseInt(changeStr);

    if (isNaN(change) || change <= 0) {
      Alert.alert("Error", "Enter a valid positive number");
      return;
    }

    let newQuantity =
      type === "add" ? product.quantity + change : product.quantity - change;

    if (newQuantity < 0) {
      Alert.alert("Error", "Stock cannot go negative");
      return;
    }

    const updatedProduct: Product = {
      ...product,
      quantity: newQuantity,
      lastUpdated: new Date(),
    };

    const transaction: Transaction = {
      id: Date.now(),
      productId: product.id,
      type,
      quantityChanged: change,
      timestamp: new Date(),
    };

    onUpdateProduct(updatedProduct, transaction);
    setQuantityChanges((prev) => ({ ...prev, [product.id]: "" }));
  };

  return (
    <View className="mt-6">
      <Text className="text-xl font-bold mb-2">Product List</Text>
      {products.map((product) => (
        <View key={product.id} className="p-3 bg-white rounded mb-2 shadow">
          <Text className="font-bold">{product.name}</Text>
          <Text>SKU: {product.sku}</Text>
          <Text>Price: ${product.price.toFixed(2)}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Text>Last Updated: {product.lastUpdated.toLocaleString()}</Text>

          <TextInput
            className="border border-gray-300 p-2 my-2 rounded"
            placeholder="Quantity"
            value={quantityChanges[product.id] || ""}
            onChangeText={(text) =>
              setQuantityChanges((prev) => ({ ...prev, [product.id]: text }))
            }
            keyboardType="numeric"
          />

          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="bg-green-500 p-2 rounded flex-1"
              onPress={() => handleStockChange(product, "add")}
            >
              <Text className="text-white text-center">Add Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded flex-1"
              onPress={() => handleStockChange(product, "remove")}
            >
              <Text className="text-white text-center">Remove Stock</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
