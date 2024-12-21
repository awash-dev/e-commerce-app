import React from 'react';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or any icon library

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='[id]'
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <Link href={'Home/screen/Home'} style={{marginRight:25, marginLeft:10}} >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </Link>
                    ),
                }}
            />
        </Stack>
    );
}

export default _layout;
