import UserForm, { User } from "@/components/UserForm";
import { useState } from "react";
import { ScrollView, View, Text } from "react-native";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers((prev) => [...prev, user]);

  return (
    <ScrollView className="flex-1 p-4">
      <UserForm onAddUser={addUser} />

      <View className="mt-6">
        <Text className="text-xl font-bold mb-2">Registered Users</Text>
        {users.length === 0 && (
          <Text className="text-gray-500">No users registered yet.</Text>
        )}
        {users.map((user) => (
          <View
            key={user.id}
            className="p-2 bg-white rounded mb-2 shadow border border-gray-200"
          >
            <Text className="font-semibold">{user.name}</Text>
            <Text className="text-gray-500">{user.email}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
