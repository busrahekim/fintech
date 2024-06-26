import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View className="flex-1 justify-between">
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          className="w-full h-full absolute"
          isMuted
          isLooping
          resizeMode={ResizeMode.COVER}
        />
      )}
      {/* shouldPlay */}
      <View className="mt-16 p-5">
        <Text className="text-4xl font-extrabold uppercase text-white">
          Ready to change the way you money?
        </Text>
      </View>
      <View className="flex flex-row justify-center gap-5 mb-14 px-5">
        <Link
          href={"/(authenticated)/(tabs)/home"}
          className="p-2 h-14 rounded-full justify-center items-center flex-1"
          style={{ backgroundColor: Colors.dark }}
          asChild
        >
          <TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Log In</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          className="p-2 h-14 rounded-full justify-center items-center flex-1 bg-white"
          asChild
        >
          <TouchableOpacity>
            <Text className="text-xl font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;
