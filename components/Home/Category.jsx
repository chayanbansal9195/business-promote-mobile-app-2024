import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import firebase from "firebase/compat/app";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setcategoryList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = async () => {
    setcategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setcategoryList((prev) => [...prev, doc.data()]);
    });
  };
  const onCategoryPressHandler = (category) => {
    if (!explore) {
      router.push("/businesslist/" + category);
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <View>
      {!explore && (
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            Category
          </Text>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "outfit-medium",
            }}
          >
            View All
          </Text>
        </View>
      )}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
        }}
        data={categoryList}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={(category) => onCategoryPressHandler(category)}
          />
        )}
      />
    </View>
  );
}
