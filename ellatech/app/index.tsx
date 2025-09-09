import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4 space-y-4">
      <Text className="text-2xl font-bold mb-6">
        Ellatech Frontend Assignment
      </Text>

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded w-full"
        onPress={() => router.push("/users/register")}
      >
        <Text className="text-white text-center font-bold">Register User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-500 p-4 rounded w-full"
        onPress={() => router.push("/products/register")}
      >
        <Text className="text-white text-center font-bold">Products</Text>
      </TouchableOpacity>
    </View>
  );
}
