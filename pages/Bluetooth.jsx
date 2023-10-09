// import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';

// export default function Bluetooth() {
//     BluetoothManager.enableBluetooth().then((r)=>{
//         var paired = [];
//         if(r && r.length>0){
//             for(var i=0;i<r.length;i++){
//                 try{
//                     paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
//                 }catch(e){
//                     alert(`devices not found!!!`)
//                 }
//             }
//         }
//         console.log(JSON.stringify(paired))
//     },(err)=>{
//        alert(err)
//    });
// }