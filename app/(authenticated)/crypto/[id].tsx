import { View, Text, SectionList, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const categories = ["Overview", "News", "Orders", "Transactions"];

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={
                  activeIndex === index
                    ? "p-2 px-3 items-center justify-center rounded-full bg-white"
                    : "p-2 px-3 items-center justify-center rounded-full"
                }
              >
                <Text
                  className={
                    activeIndex === index
                      ? "text-xl text-white"
                      : "text-xl text-[#626D77]"
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View className=" flex-row justify-between items-center mx-4">
              <Text className="text-xl font-bold mb-5 text-[#626D77]">
                {data?.symbol}
              </Text>
              <Image source={{ uri: data?.logo }} className="w-10 h-10" />
            </View>
            <View className="">
              <GestureHandlerRootView className="flex-row gap-2 m-3 ">
                <TouchableOpacity className="rounded-full bg-[#3D38ED] flex-row gap-x-2 h-10 items-center px-5">
                  <Ionicons name="add" size={24} color={"#fff"} />
                  <Text className="text-white">Buy</Text>
                </TouchableOpacity>

                <TouchableOpacity className="rounded-full bg-[#C9C8FA] flex-row gap-x-2 h-10 p-2 items-center px-5">
                  <Ionicons name="arrow-back" size={24} color={"#3D38ED"} />
                  <Text className="text-[#3D38ED]">Receive</Text>
                </TouchableOpacity>
              </GestureHandlerRootView>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View className="mt-2 mx-5 p-3 bg-white rounded-2xl">
              <Text className="text-xl font-bold mb-5 text-[#626D77]">
                Overview
              </Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
      ></SectionList>
    </>
  );
};

export default Page;
