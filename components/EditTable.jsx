import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditTable = (props) => {
    const { data, billNo } = props;
    const [dateTime, setDateTime] = useState("");
    const [editable, setEditable] = useState(true);

    const editCell = (rowIndex, cellName, value) => {

    };

    return (
        <View style={styles.table}>
            <Text style={styles.billNumber}>Bill No: {billNo}</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
            {console.log(`data: ${data}`)}
            {
                data.map((item) => (
                    <View>
                    {
                console.log(`item inside data: ${item}`)
                    
            }
            {
                item.map((i)=>{
                    return(
                        <View>
                            {console.log(i.length)}
                        </View>
                    )
                })
            }
                    </View>
            ))
            }
            {data.map((item, index) => (
                <View>
                    {console.log(`item inside purchase history: ${item}`)}
                    {
                        item.map((i, j) => (
                            <View style={styles.dataRow} key={j}>
                                <Text style={styles.cell}>
                                   {i.length}
                                </Text>
                                <Text style={styles.cell}>

                                </Text>
                                <Text style={styles.cell}>
                                   {i.girth}
                                </Text>
                                <Text style={[styles.cell, {flex: 1}]}>{i.CFT.toFixed(4)}</Text>
                            </View>
                        ))
                    }
                    <View style={[styles.totalRow, { borderTopWidth: 1, borderColor: "#000" }]}>
                        <Text style={[styles.totalCell, { flex: 3 }]}>Total CFT</Text>
                        {/* <Text style={[styles.totalCell, { flex: 1 }]}>{cft.toFixed(4)}</Text> */}
                    </View>
                    <View
                        style={[styles.totalRow, { borderBottomWidth: 1, borderColor: "#000" }]}
                    >
                        <Text style={[styles.totalCell, { flex: 3 }]}>
                            {/* Total Price (@{price}) */}
                        </Text>
                        {/* <Text style={[styles.totalCell, { flex: 1 }]}>{(cft * price).toFixed(2)}</Text> */}
                    </View>
                </View>
            ))}
            <Button
                title={editable ? "Add Row" : "Not Editable"}
                disabled={!editable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        width: "100%",
        paddingHorizontal: 10,
    },
    billNumber: {
        textAlign: "left",
        paddingVertical: 5,
        fontWeight: "bold",
    },
    dateTime: {
        textAlign: "right",
        paddingVertical: 5,
        fontWeight: "bold",
    },
    dataRow: {
        flexDirection: "row",
        padding: 5,
    },
    cell: {
        flex: 1,
    },
    totalRow: {
        flexDirection: "row",
        backgroundColor: "#e0e0e0",
        padding: 5,
        paddingTop: 0,
        paddingLeft: 20,
    },
    totalCell: {
        flex: 1,
        fontWeight: "bold",
    },
});
