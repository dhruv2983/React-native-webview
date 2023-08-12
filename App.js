import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, BackHandler, KeyboardAvoidingView } from 'react-native';
import WebView from 'react-native-webview';

const MyWebView = () => {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBackButton = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [canGoBack]);


  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="margin" keyboardVerticalOffset={20}>
        <WebView
          source={{ uri: 'https://example.com' }}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
          ref={webViewRef}
          onNavigationStateChange={handleNavigationStateChange}
        />
        <StatusBar
          backgroundColor="#FFFFFF"
          translucent={false}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
});

export default MyWebView;
