import ProductForm, { Product } from "../../components/ProductForm";
import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const PAGE_SIZE = 1;

export default function RegisterProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [qtyInputs, setQtyInputs] = useState<{ [id: number]: string }>({});

  const addProduct = (product: Product) =>
    setProducts((prev) => [...prev, product]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginatedProducts = products.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Adjust stock handler
  const adjustStock = (product: Product, type: "add" | "remove") => {
    const qty = parseInt(qtyInputs[product.id] || "0");
    if (isNaN(qty) || qty <= 0) {
      alert("Enter a positive number");
      return;
    }
    let newQty =
      type === "add" ? product.quantity + qty : product.quantity - qty;
    if (newQty < 0) {
      alert("Stock cannot go negative");
      return;
    }
    const updatedProduct = {
      ...product,
      quantity: newQty,
      lastUpdated: new Date(),
    };
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? updatedProduct : p))
    );
    setQtyInputs((prev) => ({ ...prev, [product.id]: "" }));
  };

  return (
    <ScrollView className="flex-1 p-4">
      <ProductForm onAddProduct={addProduct} />

      <View className="mt-6">
        <Text className="text-xl font-bold mb-2">Registered Products</Text>
        {products.length === 0 && (
          <Text className="text-gray-500">No products registered yet.</Text>
        )}
        {paginatedProducts.map((product) => (
          <View
            key={product.id}
            className="p-2 bg-white rounded mb-2 shadow border border-gray-200"
          >
            <Text className="font-semibold">{product.name}</Text>
            <Text className="text-gray-500">SKU: {product.sku}</Text>
            <Text className="text-gray-500">Price: ${product.price}</Text>
            <Text className="text-gray-500">Quantity: {product.quantity}</Text>
            <Text className="text-gray-400 text-xs">
              Last Updated: {new Date(product.lastUpdated).toLocaleString()}
            </Text>
            <View className="flex-row items-center mt-2 space-x-2">
              <TextInput
                className="border border-gray-300 rounded px-2 py-1 w-20"
                placeholder="Qty"
                keyboardType="numeric"
                value={qtyInputs[product.id] || ""}
                onChangeText={(text) =>
                  setQtyInputs((prev) => ({ ...prev, [product.id]: text }))
                }
              />
              <TouchableOpacity
                className="bg-green-500 px-3 py-2 rounded"
                onPress={() => adjustStock(product, "add")}
              >
                <Text className="text-white font-bold">Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-3 py-2 rounded"
                onPress={() => adjustStock(product, "remove")}
              >
                <Text className="text-white font-bold">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Pagination Controls */}
        {products.length > PAGE_SIZE && (
          <View className="flex-row justify-center items-center mt-4 space-x-4">
            <TouchableOpacity
              className="bg-gray-300 px-3 py-2 rounded"
              disabled={page === 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Text className="text-black font-bold">Previous</Text>
            </TouchableOpacity>
            <Text>
              Page {page} of {totalPages}
            </Text>
            <TouchableOpacity
              className="bg-gray-300 px-3 py-2 rounded"
              disabled={page === totalPages}
              onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <Text className="text-black font-bold">Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
