import React from 'react';
import { Text,
   View,
   TouchableOpacity,
   Image,
   StyleSheet,} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState: id,
          scanned: false
        });
      }

      handlerBarCodeScanned=async({type,data})=>{
          this.setState({
              scanned:true,
              scannedData:data,
              buttonState:'normal'
          })
        }

  
        render() {
            const hasCameraPermissions = this.state.hasCameraPermissions;
            const scanned = this.state.scanned;
            const buttonState = this.state.buttonState;
      
            if (buttonState !== "normal" && hasCameraPermissions){
              return(
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
        );
    }
    else if(buttonState ==='normal'){
        return(
            <View style={styles.container} >
                <Image
                source={require("../assets/Barcode-scanner.jpg")}
                style={{width:200, height: 200}}/>
                <Text style={styles.displayText}>{hasCameraPermissions===true? this.state.scannedData:"Request camera permission"}</Text>

                <TouchableOpacity
                onPress={this.getCameraPermissions} 
                style={styles.scanButton}
                >
                    <Text style={styles.buttonText}>Scan QR code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    }

  });