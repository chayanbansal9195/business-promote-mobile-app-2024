import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
        }}
      >
        Reviews
      </Text>
      <View>
        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write your comment"
          numberOfLines={4}
          style={{
            textAlignVertical: "top",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
          }}
        />
        <TouchableOpacity
          disabled
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-regular",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
