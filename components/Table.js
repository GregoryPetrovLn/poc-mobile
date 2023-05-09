import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const Table = ({ data, onRowPress }) => {
  const [searchText, setSearchText] = useState("");

  // Filter the data based on the search text
  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={tw`border border-gray-400`}>
      {/* Search Input */}
      <TextInput
        style={tw`p-2 border-b border-gray-400`}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Table Header */}
      <View style={tw`flex-row bg-gray-200`}>
        <View style={tw`flex-1 p-2 border-b border-gray-400`}>
          <Text style={tw`text-gray-700 font-bold`}>Name</Text>
        </View>
        <View style={tw`flex-1 p-2 border-b border-gray-400`}>
          <Text style={tw`text-gray-700 font-bold`}>Price</Text>
        </View>
        <View style={tw`flex-1 p-2 border-b border-gray-400`}>
          <Text style={tw`text-gray-700 font-bold`}>Quantity</Text>
        </View>
      </View>

      {/* Table Body */}
      {filteredData?.map((item, index) => (
        <TouchableOpacity
          key={item?._id}
          onPress={() => {
            onRowPress(item);
          }}
        >
          <View
            key={index}
            style={[tw`flex-row`, index % 2 === 0 ? tw`bg-gray-100` : null]}
          >
            <View style={tw`flex-1 p-2 border-b border-gray-400`}>
              <Text>{item.name}</Text>
            </View>
            <View style={tw`flex-1 p-2 border-b border-gray-400`}>
              <Text>{item.price}</Text>
            </View>
            <View style={tw`flex-1 p-2 border-b border-gray-400`}>
              <Text>{item.quantity}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Table;
