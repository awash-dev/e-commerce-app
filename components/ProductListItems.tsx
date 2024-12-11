import { Text } from "react-native";

export default function ProductListItems({ product }) {
    return (
        <Text className="p-4" >{product.name}</Text>
    );
}