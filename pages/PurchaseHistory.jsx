import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PurchaseHistory = ({navigation}) => {

    const [billNo, setBillNo] = useState('');
    const [data, setData] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();

        const retrieveData = async () => {
            try {
                const savedData = await AsyncStorage.getItem("tableData");
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    setBillNo(parsedData.billNo);
                    setData(parsedData.data);
                    setDate(parsedData.date);
                    setTime(parsedData.time);
                }
            } catch (error) {
                console.error("Error retrieving data: ", error);
            }
        };

        useEffect(() => {
            retrieveData()
                .then((response) => console.log(response))
                .catch((error) => console.warn(error))
        },[]);

    return(
        <View>
            {data.map((item, index)=> {
                return(
                    <View>
                        <View style={styles.container}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.label}>Bill No.: </Text>
                                <Text style={styles.value}>{item.length}</Text>
                            </View>
                            <View style={styles.dateTimeColumn}>
                                <View style={styles.rightColumn}>
                                    <Text style={styles.label}>Date: </Text>
                                    <Text style={styles.value}>{date}</Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text style={styles.label}>Time: </Text>
                                    <Text style={styles.value}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    leftColumn: {
        flexDirection: 'row',
    },
    rightColumn: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    dateTimeColumn: {
        flexDirection: 'column',
    }
});


