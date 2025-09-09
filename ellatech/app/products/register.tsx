import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const PAGE_SIZE = 5;

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: Date;
}

interface Transaction {
  id: number;
  productId: number;
  type: "add" | "remove";
  quantity: number;
  date: Date;
}

export default function RegisterProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [qtyInputs, setQtyInputs] = useState<{ [id: number]: string }>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Add product handler
  const handleAddProduct = () => {
    if (!sku || !name || !price || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert("Price must be a positive number");
      return;
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      alert("Quantity must be a positive number");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      sku,
      name,
      price: parsedPrice,
      quantity: parsedQuantity,
      lastUpdated: new Date(),
    };

    setProducts((prev) => [...prev, newProduct]);

    // Clear form
    setSku("");
    setName("");
    setPrice("");
    setQuantity("");
    alert("Product added successfully");
  };

  // Pagination
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
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

    // Add to transaction history
    setTransactions((prev) => [
      {
        id: Date.now(),
        productId: product.id,
        type,
        quantity: qty,
        date: new Date(),
      },
      ...prev,
    ]);
  };

  return (
    <ScrollView className="flex-1 p-4">
      {/* Styled Product Registration Form */}
      <View className="p-4 bg-white rounded-lg shadow-md mb-6">
        <Text className="text-lg font-bold mb-2">Register Product</Text>
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded"
          placeholder="SKU"
          value={sku}
          onChangeText={setSku}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded"
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          className="border border-gray-300 p-2 mb-4 rounded"
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded"
          onPress={handleAddProduct}
        >
          <Text className="text-white font-bold text-center">Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Product Table */}
      <View className="mt-2">
        <Text className="text-xl font-bold mb-2">Registered Products</Text>
        {products.length === 0 && (
          <Text className="text-gray-500">No products registered yet.</Text>
        )}

        {/* Table Header */}
        {products.length > 0 && (
          <View className="flex-row bg-gray-100 p-2 rounded-t">
            <Text className="flex font-bold">Name</Text>
            <Text className="flex font-bold">SKU</Text>
            <Text className="w-16 font-bold text-center">Price</Text>
            <Text className="w-20 font-bold text-center">Quantity</Text>
            <Text className="flex font-bold text-center">Last Updated</Text>
            <Text className="w-36 font-bold text-center">Stock</Text>
          </View>
        )}

        {/* Table Rows */}
        {paginatedProducts.map((product) => (
          <View
            key={product.id}
            className="flex-row items-center border-b border-gray-200 p-2 bg-white"
          >
            <Text className="flex-1">{product.name}</Text>
            <Text className="flex-1">{product.sku}</Text>
            <Text className="w-16 text-center">${product.price}</Text>
            <Text className="w-20 text-center">{product.quantity}</Text>
            <Text className="flex-1 text-xs text-gray-400 text-center">
              {new Date(product.lastUpdated).toLocaleDateString()}
            </Text>
            <View className="w-36 flex-row items-center space-x-1">
              <TextInput
                className="border border-gray-300 rounded px-2 py-1 w-12 mr-1"
                placeholder="Qty"
                keyboardType="numeric"
                value={qtyInputs[product.id] || ""}
                onChangeText={(text) =>
                  setQtyInputs((prev) => ({ ...prev, [product.id]: text }))
                }
              />
              <TouchableOpacity
                className="bg-green-500 px-2 py-1 rounded"
                onPress={() => adjustStock(product, "add")}
              >
                <Text className="text-white font-bold text-xs">Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-2 py-1 rounded ml-1"
                onPress={() => adjustStock(product, "remove")}
              >
                <Text className="text-white font-bold text-xs">Remove</Text>
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

      {/* Transaction History Button */}
      <View className="mt-8 mb-2 self-start pl-[10px]">
        <TouchableOpacity
          className="bg-purple-500 px-4 py-2 rounded"
          onPress={() => setShowHistory((prev) => !prev)}
        >
          <Text className="text-white font-bold text-center">
            {showHistory ? "Hide" : "Show"} History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History (Shown only if toggled) */}
      {showHistory && transactions.length > 0 && (
        <View className="mt-2">
          <Text className="text-xl font-bold mb-2">Transaction History</Text>
          {transactions.map((tx) => {
            const prod = products.find((p) => p.id === tx.productId);
            return (
              <View
                key={tx.id}
                className="flex-row items-center border-b border-gray-200 p-2 bg-white"
              >
                <Text className="flex-1">{prod?.name || "Unknown"}</Text>
                <Text className="w-20 text-center">
                  {tx.type === "add" ? "+" : "-"}
                </Text>
                <Text className="w-20 text-center">{tx.quantity}</Text>
                <Text className="flex-1 text-xs text-gray-400 text-center">
                  {tx.date.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}
