import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );
        const { phoneNumberId } = firstPhoneFactor;

        signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert(error.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View
        className="p-4 flex-1"
        style={{
          backgroundColor: Colors.background,
        }}
      >
        <Text className="text-4xl font-extrabold">Welcome back!</Text>
        <Text className="text-lg text-[#626D77] mt-5">
          Enter the phone number associated with your account
        </Text>
        <View className="flex flex-row my-10">
          <TextInput
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            className="bg-[#D8DCE2] rounded-md text-lg mr-3 p-5 w-20"
            value={countryCode}
          />

          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            className="bg-[#D8DCE2] rounded-md text-lg mr-3 flex-1 p-5"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          className={`p-2 h-14 rounded-md justify-center items-center mb-5 ${
            phoneNumber !== "" ? "bg-[#3D38ED]" : "bg-[#C9C8FA]"
          }`}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text className="text-lg font-semibold text-white">Continue</Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center gap-4">
          <View
            className="flex-1 bg-[#626D77]"
            style={{ height: StyleSheet.hairlineWidth }}
          />
          <Text className="text-[#626D77] text-lg">or</Text>
          <View
            className="flex-1 bg-[#626D77]"
            style={{ height: StyleSheet.hairlineWidth }}
          />
        </View>

        <View className="flex flex-row justify-around">
          <TouchableOpacity
            className="p-5 rounded-full justify-center items-center bg-[#fff] flex-row flex mt-5"
            onPress={() => onSignIn(SignInType.Email)}
          >
            <Ionicons name="mail" size={24} color={"#000"} />
          </TouchableOpacity>

          <TouchableOpacity
            className="p-5 rounded-full justify-center items-center bg-[#fff] flex-row flex mt-5"
            onPress={() => onSignIn(SignInType.Google)}
          >
            <Ionicons name="logo-google" size={24} color={"#000"} />
          </TouchableOpacity>

          <TouchableOpacity
            className="p-5 rounded-full justify-center items-center bg-[#fff] flex-row flex mt-5"
            onPress={() => onSignIn(SignInType.Apple)}
          >
            <Ionicons name="logo-apple" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
