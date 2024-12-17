import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

export default function ProfileUpdate() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSave = () => {
        // Handle save logic here (e.g., API call)
        console.log("Saved Name:", name);
        console.log("Saved Password:", password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
