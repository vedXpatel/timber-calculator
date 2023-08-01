import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Purchase')}>
                <Text style={styles.buttonText}>
                    Purchase ( Log Wood )
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobWork')}>
                <Text style={styles.buttonText}>
                    Job Work
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Cut Size
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        backgroundColor: '#DDDDDD',
        width: width / 1.4,
        height: 52,
        textAlign: 'center',
        borderRadius: 10,
        marginBottom: height/30,
    },
    buttonText: {
        fontSize: 25,
        alignSelf: 'center',
    }
});
