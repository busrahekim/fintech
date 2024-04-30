import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  CartesianChart,
  CartesianChartRenderArg,
  Line,
  useChartPressState,
} from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const categories = ["Overview", "News", "Orders", "Transactions"];

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  useEffect(() => {
    console.log(isActive);
    if (isActive) Haptics.selectionAsync;
  }, [isActive]);

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async (): Promise<any[]> =>
      fetch(`/api/tickers`).then((res) => res.json()),
  });

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} $`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
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
            <View className="h-full mx-5 p-3 bg-white rounded-full gap-5">
              {tickers && (
                <>
                  {!isActive && (
                    <View>
                      <Text className="text-3xl font-bold text-[#141518]">
                        {tickers[tickers.length - 1].price.toFixed(2)} $
                      </Text>
                      <Text className="text-lg text-[#626D77]">Today</Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: Colors.dark,
                        }}
                        animatedProps={animatedText}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{ fontSize: 18, color: Colors.gray }}
                        animatedProps={animatedDateText}
                      ></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} $`,
                      formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
                    }}
                    data={tickers!}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
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
