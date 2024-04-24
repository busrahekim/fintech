import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";

const Page = () => {
  const balance = "234";
  // const headerHeight = useHeaderHeight();
  const onAddMoney = () => {};
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      // contentContainerStyle={{
      //   paddingTop: headerHeight,
      // }}
    >
      <View className="m-20">
        <View className="flex flex-row gap-2 justify-center items-end">
          <Text className="font-bold text-5xl">{balance}</Text>
          <Text className="text-xl font-semibold">$</Text>
        </View>
      </View>
      <View className="flex flex-row justify-around p-5">
        <RoundBtn icon={"add"} onPress={onAddMoney} title="Add money" />
        <RoundBtn icon={"refresh"} onPress={onAddMoney} title="Exchange" />
        <RoundBtn icon={"list"} onPress={onAddMoney} title="Details" />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

export default Page;
