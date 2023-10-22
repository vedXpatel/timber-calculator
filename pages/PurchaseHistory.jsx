import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {EditTable} from '../components/EditTable';
import Swipeout from 'react-native-swipeout';

export const PurchaseHistory = ({navigation}) => {

    const [billNo, setBillNo] = useState('');
    const [data, setData] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [localData, setLocalData] = useState([]);
    const [tableView, setTableView] = useState(false);
    const [tempData, setTempData] = useState([]);
    const [tempBill, setTempBill] = useState();

    const retrieveData = async () => {
            setLocalData([]);
            const temp = await AsyncStorage.getItem('billNo');
            // console.log(`bill no set inside purchase history ${temp}`);
            setBillNo(temp);
            try {
                const bill = +billNo;
                for (let i = 1; i <= bill + 1; i++) {
                    try{
                        if(await AsyncStorage.getItem(i.toString()) !== null){
                    const savedData = await AsyncStorage.getItem(i.toString());
                    // console.log(savedData);
                    setLocalData((prev) => {
                        return [...prev, savedData]
                    });
                        }
                    } catch(error) {
                        alert(`Error Fetching Local Data`);
                    }
                }
                // console.log(localData);
            } catch (error) {
                console.error("Error retrieving data: ", error);
            }
        };

        useEffect(() => {
            retrieveData();
        },[]);

    return(
        <ScrollView>
            {
                !tableView ? (
                    <View>

            <TouchableOpacity onPress={retrieveData}>
                <Text>
                    Refresh
                </Text>
            </TouchableOpacity>
            {localData.map((item, index)=> {
                return(
                    <Swipeout right={[
                        {
                            text: 'Delete',
                            onPress: async() => await AsyncStorage.removeItem(JSON.stringify(JSON.parse(item).tempBill)),
                            backgroundColor: 'red',
                        }
                    ]}>
                        {
                            console.log(localData)
                        }
                    <TouchableOpacity style={styles.listContainer} onPress={async() => {
                        await setTempData(JSON.parse(item).data);
                        setTempBill(JSON.parse(item).tempBill);
                        setTableView(true);
                    }}>
                    <View>
                        <View style={styles.container}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.label}>Bill No.: </Text>
                                <Text style={styles.value}>{JSON.parse(JSON.parse(item).tempBill)}</Text>
                            </View>
                            <View style={styles.dateTimeColumn}>
                                <View style={styles.rightColumn}>
                                    <Text style={styles.label}>Date: </Text>
                                    <Text style={styles.value}>{JSON.parse(item).date}</Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text style={styles.label}>Time: </Text>
                                    <Text style={styles.value}>{JSON.parse(item).time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                    </Swipeout>
                )
            })}
                    </View>
                ) : <EditTable data={tempData} billNo={tempBill}/>
            }
        </ScrollView>
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
    },
    listContainer: {
        borderWidth: 1,
        backgroundColor: '#cbcbcb',
        borderColor: '#cbcbcb',
        margin: 10,
        borderRadius: 10,
    }
});


