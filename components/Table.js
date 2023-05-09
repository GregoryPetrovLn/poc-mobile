import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const Table = ({ data, onRowPress }) => {
  return (
    <View style={tw`border border-gray-400`}>
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
      {data?.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            console.log("HERE");
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
