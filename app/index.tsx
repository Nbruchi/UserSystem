import React from "react";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingPage = () => {
  return (
    <SafeAreaView className="w-full h-full p-4">
      <ScrollView className="w-full h-full flex items-center justify-center flex-col">
        <Text className="text-3xl">Welcome home</Text>
        <Link href="/sign-in">Register account</Link>
        <Link href="/home">Go home</Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
