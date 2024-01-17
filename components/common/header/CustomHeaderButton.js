import React from 'react';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CustomHeaderButton = ({ title, iconName, onPress }) => {
  const icon = <FontAwesome5 name={iconName} size={24} color="black" />;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          marginLeft: 10,
          marginRight: 10,
        },
        pressed && { opacity: 0.2 },
      ]}
    >
      {icon}
    </Pressable>
  );
};

export default CustomHeaderButton;
