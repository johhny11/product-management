📱 React Native Expo App – User & Product Management

This is a small React Native app built with Expo and NativeWind.

🚀 Features

Register a User – capture email and full name.

Register a Product – capture SKU, name, price, and quantity.

Adjust Product Stock – add/remove stock (cannot go negative).

View Product Status – display SKU, quantity, and last updated time.

Transaction History – shows changes with pagination.

Pagination – product list supports 5 products per page.

🛠️ Tech Stack

React Native (Expo) – for building cross-platform app

NativeWind – styling (Tailwind CSS for React Native)

React Hooks (useState, useEffect) – for state management

✨ Approach & Trade-offs

Used local state only, no backend, to simulate API-like behavior.

Centralized state in a shared context so all pages (Users, Products, Transactions) can access and update data.

Chose NativeWind for styling as required. However, since I usually work with plain CSS, using NativeWind was a bit challenging. In a real project, I might balance between NativeWind and StyleSheet for speed.

Focused on implementing core functionality first (user registration, product registration, listing with pagination), then refined the UI.

=> Installation and Setup

Install dependencies: ( npm install )
Start the development server: ( npx expo start ) 
