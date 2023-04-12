import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const MyWebView = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.example.com' }}
        style={styles.container}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <StatusBar hidden/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // adjust opacity to customize the loading overlay
  },
});

export default MyWebView;
