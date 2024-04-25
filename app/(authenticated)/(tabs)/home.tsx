import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";

const Page = () => {
  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();
  // const headerHeight = useHeaderHeight();
  const onAddMoney = () => {
    runTransaction({
      transactionId: Math.random().toString(),
      title: "Money added",
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
    });
  };
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      // contentContainerStyle={{
      //   paddingTop: headerHeight,
      // }}
    >
      <View className="m-20">
        <View className="flex flex-row gap-2 justify-center items-end">
          <Text className="font-bold text-5xl">{balance()}</Text>
          <Text className="text-xl font-semibold">$</Text>
        </View>
      </View>
      <View className="flex flex-row justify-around p-5">
        <RoundBtn icon={"add"} onPress={onAddMoney} title="Add money" />
        <RoundBtn icon={"refresh"} onPress={onAddMoney} title="Exchange" />
        <RoundBtn icon={"list"} onPress={onAddMoney} title="Details" />
        <Dropdown />
      </View>

      <Text className="font-semibold text-lg m-5 mb-2">Transactions</Text>
      <View className="rounded-2xl bg-white mx-5 p-3">
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet
          </Text>
        )}
        {transactions.map((transaction) => (
          <View
            className="items-center flex flex-row gap-4"
            key={transaction.transactionId}
          >
            <View className="rounded-full w-8 h-8 bg-[#D8DCE2] justify-center items-center">
              <Ionicons
                size={24}
                color={Colors.dark}
                name={transaction.amount > 0 ? "add" : "remove"}
              />
            </View>
            <View className="flex-1">
              <Text className="font-normal">{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}$</Text>
          </View>
        ))}
      </View>
      <Text className="font-bold text-lg m-5 mb-2">Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Page;
