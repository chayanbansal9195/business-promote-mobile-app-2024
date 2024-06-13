import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            color: Colors.GRAY,
            fontSize: 15,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Image
              source={require("../../assets/images/star.png")}
              style={{
                width: 15,
                height: 15,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-regular",
              }}
            >
              4.5
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
