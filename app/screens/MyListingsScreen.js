import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

const initialMessages = [
  {
    id: 1,
    title: "John Smith",
    description: "Hey! Is this item still available?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Sara Smith",
    description: "I'm interested in this item. When I can take it?",
    image: require("../assets/mosh.jpg"),
  },
];

function MyListingsScreen(props) {
  const [listings, setListings] = useState();

  const getListingsApi = useApi(listingsApi.getListings);
  useEffect(() => {
    getListingsApi.request();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setListings(listings.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={getListingsApi.data}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setListings([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MyListingsScreen;
