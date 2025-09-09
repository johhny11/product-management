import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import "../global.css";

//User
export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserFormProps {
  onAddUser: (user: User) => void;
}

export default function UserForm({ onAddUser }: UserFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //Email validation

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a correct email address");
      return;
    }

    onAddUser({ id: Date.now(), name, email });

    //Clear form

    setName("");
    setEmail("");

    alert("User added successfully");
  };

  return (
    <View className="p-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-2">Register user</Text>

      <TextInput
        className="border border-gray-300 p-2 mb-2 rounded"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-300 p-2 mb-2 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-center">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
