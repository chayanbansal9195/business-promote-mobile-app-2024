import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import { ActivityIndicator } from "react-native-web";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    GetBusinessDetailById();
  }, []);
  const GetBusinessDetailById = async () => {
    setloading(true);
    const docRef = doc(db, "BusinessList", businessid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness(docSnap.data());
      setloading(false);
    } else {
      console.log("No such document");
    }
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "60%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}
