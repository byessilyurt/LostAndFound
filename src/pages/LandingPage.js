import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Dimensions } from 'react-native';

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(5),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 2300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => document.location.href = "http://localhost:3000/signup",2300);
  }
  
  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

const App = () => (
  <View style={styles.container}>
    <ImageLoader
      style={styles.image}
      source={{ uri: 'https://images.unsplash.com/3/www.madebyvadim.com.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1782&q=80' }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get("screen").height , 
    width: Dimensions.get("screen").width,
    borderRadius: 10,
  },
});

export default App;