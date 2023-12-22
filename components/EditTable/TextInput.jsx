import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const TextInput = ({
    defaultValue, data, index, type, categoryIndex
}) => { 

    const [value, setValue] = useState(defaultValue);
    

    const handleOnChange = () => {
        type === 'length' ?
        data[index][categoryIndex].length = value :
        data[index][categoryIndex].girth = value;
    }

    return(
        <View>
            <TextInput
                defaultValue={value}
                onChangeText={(value) => setValue(value)}
                style={styles.cell}
                onBlur={handleOnChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
    },
});