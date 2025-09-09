import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Transaction } from "./ProductList";
import { Product } from "./ProductForm";

interface TransactionHistoryProps {
  transactions: Transaction[];
  products: Product[];
  pageSize?: number;
}

export default function TransactionHistory({
  transactions,
  products,
  pageSize = 5,
}: TransactionHistoryProps) {
  const [page, setPage] = useState(0);

  const start = page * pageSize;
  const end = start + pageSize;
  const paginated = transactions.slice().reverse().slice(start, end); // newest first

  return (
    <View className="mt-6">
      <Text className="text-xl font-bold mb-2">Transaction History</Text>
      {paginated.map((tx) => {
        const product = products.find((p) => p.id === tx.productId);
        return (
          <View key={tx.id} className="p-2 bg-white rounded mb-1 shadow">
            <Text>
              {tx.type === "add" ? "Added" : "Removed"} {tx.quantityChanged}{" "}
              units of {product?.name || "Unknown"}
            </Text>
            <Text className="text-gray-500 text-sm">
              {tx.timestamp.toLocaleString()}
            </Text>
          </View>
        );
      })}

      <View className="flex-row justify-between mt-2">
        <TouchableOpacity
          className="bg-gray-300 p-2 rounded"
          disabled={page === 0}
          onPress={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          <Text>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-300 p-2 rounded"
          disabled={(page + 1) * pageSize >= transactions.length}
          onPress={() => setPage((prev) => prev + 1)}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
