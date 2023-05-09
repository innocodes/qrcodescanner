import React,  { Component, Fragment, useState}
    from 'react';
// import React = require('react');
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {styles} from './scanStyle';


export default function Scan() {

    const [scan, setScan] = useState(false);
    const [scanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);

    const onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        setScan(false);
        setScanResult(true);
        setResult(e);
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            setResult(e);
            setScan(false);
            setScanResult(true);
        }
    }

    const activeQR = () => {
        setScan(true);
    }

    const scanAgain = () => {
        setScan(true);
        setScanResult(false);
    }

    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                        <Image source={require('./assets/back.png')} style={{height: 20, width: 26}} />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>Scan QR Code</Text>
                </View>
                {!scan && !scanResult  && (
                    <View style={styles.cardView}>
                        <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}} />
                        <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                        <Image source={require('./assets/qr-code.png')} style={{margin: 20}} />
                        <TouchableOpacity onPress={() => activeQR()} style={styles.buttonScan}>
                            <View style={styles.buttonWrapper}>
                                <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}} />
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan QR Code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                }
                {scanResult && (
                    <Fragment>
                        <Text style={styles.textTitle}>Result</Text>
                        <View style={scanResult ? styles.scanCardView : styles.cardView}>
                            <Text>Type: {result.type}</Text>
                            <Text>Result: {result.data}</Text>
                            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                            <TouchableOpacity onPress={() => scanAgain() } style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                    <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}} />
                                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                )}
                {
                    scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => this.scanner = node}
                        onRead={onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                Please move your camera {"\n"} over the QR Code
                            </Text>
                        }
                        bottomContent={
                            <View>
                                <ImageBackground source={require('./assets/bottom-panel.png')}>
                                    <TouchableOpacity
                                        style={styles.buttonScan2}
                                        onPress={() => this.scanner.reactivate()}
                                        onLongPress={() => setScan(false)}>
                                        <Image source={require('./assets/camera2.png')} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        }
                    />
                }
            </Fragment>
        </View>
    )
}
