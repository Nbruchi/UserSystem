import React from "react";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  return (
    <SafeAreaView className="w-full h-screen p-4">
      <ScrollView className="w-full">
        <View className="flex-col items-center justify-center w-full min-h-[90vh]">
          <Text className="text-4xl font-bold">Welcome home</Text>
          <Link href="/sign-in">Register account</Link>
          <Link href="/home">Go home</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexPage;
