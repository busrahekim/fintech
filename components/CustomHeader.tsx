import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View className="flex flex-row items-center justify-around h-14 gap-2 px-5 bg-transparent">
        <Link href={"/"} asChild>
          <TouchableOpacity className="rounded-full bg-[#626D77] w-10 h-10 justify-center items-center">
            <Text className="text-white font-medium text-lg">BH</Text>
          </TouchableOpacity>
        </Link>

        <View className="flex-1 flex-row bg-[#D8DCE2] rounded-lg items-center gap-x-2 gap-y-1 justify-center">
          <Ionicons
            name={"search"}
            size={20}
            color={Colors.dark}
            style={{ padding: 10 }}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.dark}
            className="flex-1 p-1 pl-0 bg-[#D8DCE2] text-[#141518]"
          />
        </View>
        <View className="rounded-full bg-[#D8DCE2] w-10 h-10 justify-center items-center">
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View className="rounded-full bg-[#D8DCE2] w-10 h-10 justify-center items-center">
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
