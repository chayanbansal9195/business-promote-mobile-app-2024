import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import { useUser } from "@clerk/clerk-expo";
import BusinesListCard from "../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    user && GetUserBusiness();
  }, [user]);
  const GetUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        My Business
      </Text>

      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinesListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
