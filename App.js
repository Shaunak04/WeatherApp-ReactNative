import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from "react-native-vector-icons/AntDesign";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      temp: "",
      city: "London",
      icon: "",
      city_display: "",
      desc: "",
      main: "",
      humidity: "",
      pressure: "",
      visiblity: "",
      fill: "",
    }
    this.fetch_weather()
  }
  fetch_weather = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=71bc0174c0bc055562e89f563918d2a1').then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp: (json.main.temp - 273.15).toFixed(1) + " °C" })
        this.setState({ city_display: json.name })
        this.setState({ icon: json.weather[0].icon })
        this.setState({ desc: json.weather[0].description })
        this.setState({ main: json.weather[0].main })
        this.setState({ fill: json.main.humidity })
        this.setState({ pressure: json.main.pressure + " hPa" })
        this.setState({ visibility: (json.visibility / 1000).toFixed(2) + " Km" })
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header} >
            <TextInput placeholder="Search" placeholderTextColor="black" style={styles.Search_Box} onChangeText={(text) => this.setState({ city: text })} />
            <View style={styles.searchicon}>
              <TouchableOpacity onPress={this.fetch_weather}>
                <Icon name="search1" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.name}>{this.state.city}</Text>
          <View style={styles.outerCard}>
            <View style={styles.innerCard}>
              <View style={styles.Weather_Image}>
                <Image tintColor='#FFF' source={{ uri: "http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png", }} style={styles.Image} />
              </View>
              <View style={styles.Weather_Image}>
                <Text h3 style={styles.city}>{this.state.main}</Text>
                <Text h1 style={styles.temp}>{this.state.temp} </Text>
                <Text style={styles.info}>{this.state.desc}</Text>
              </View>
            </View>
          </View>
          <View style={styles.holder}>
            <View style={[styles.smallCard, styles.noMargin]}>
              <Text style={[styles.labels, styles.pressure]}>Pressure</Text>
              <Text style={[styles.pressText]}>{this.state.pressure}</Text>
            </View>
            <View style={styles.smallCard}>
              <Text style={[styles.labels, styles.visibility]}>Visibility</Text>
              <Text style={styles.pressText}>{this.state.visibility}</Text>
            </View>
            <View style={styles.humidCard}>
              <Text style={[styles.labels, styles.humid]}>Humidity</Text>
              <AnimatedCircularProgress
                style={styles.humidBar}
                size={140}
                rotation={210}
                tintColorSecondary="#E78C23"
                lineCap="round"
                fill={this.state.fill}
                width={12}
                tintColor="red"
                backgroundColor="#3d5875" >
                {
                  (fill) => (
                    <Text style={styles.humidText}>
                      {this.state.fill + " %"}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
          </View>

          <StatusBar style="dark" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: "20%",
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#EFF6FC',
  },
  Search_Box: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "70%",
    marginRight: 28,
    marginLeft: "7%",
    height: 35,
    borderColor: '#29354B',
  },
  searchicon: {
    shadowColor: "red",
    shadowOffset: {
      width: 20,
      height: 80,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 7,
    backgroundColor: '#E6F0FA',
    padding: 2,
    borderRadius: 100,
  },
  name: {
    marginLeft: "10%",
    marginTop: 20,
    fontSize: 40,
    marginBottom: -25,
    fontWeight: 'bold',
    color: '#324370',
  },
  outerCard: {
    marginTop: 35,
    width: "88%",
    marginHorizontal: "6%",
    height: 200,
    shadowColor: "red",
    shadowOffset: {
      width: 20,
      height: 80,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 15,
    borderRadius: 40,
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderWidth: 0.5,
  },
  innerCard: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: '#E7F0F9',
    borderWidth: 0,
    borderColor: 'white',
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    fontSize: 15,
    textAlign: 'center',
    color: '#374A66',
    margin: 5,
  },
  Weather_Image: {
    width: "50%",
    height: 100,
  },
  Image: {
    height: "100%",
    width: "100%",
  },
  city: {
    color: '#E78C23',
    textAlign: 'right',
  },
  temp: {
    color: '#374A66',
    textAlign: 'right',
  },
  holder: {

    borderRadius: 40,
    paddingBottom: 3,
    backgroundColor: "transparent",
    marginBottom: "10%",
    borderRadius: 40,
    marginTop: "10%",
    marginHorizontal: "7%",
    borderColor: "black",
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexGrow: 3,
    flexWrap: 'wrap',
    borderColor: 'transparent',
    borderTopColor: '#EFF6FC',
    borderWidth: 1,
  },
  labels: {
    marginTop: 20,
    textAlign: 'center',
    color: '#5ac8fa',
    fontSize: 25,
    fontWeight: 'bold',
  },
  humid: {
    color: '#5ac8fa',
  },
  pressure: {
    color: '#ff3830'
  },
  visibility: {
    color: '#ffcc00'
  },
  smallCard: {
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 17,
    height: "40%",
    borderRadius: 40,
    width: '48%',
    backgroundColor: '#29354B',
  },
  noMargin: {
    marginRight: "4%",
  },
  humidCard: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    borderRadius: 40,
    marginTop: 23,
    width: "100%",
    height: 250,
    backgroundColor: '#29354B',
  },
  humidText: {
    fontSize: 26,
    color: '#EFF6FC',
  },
  humidBar: {
    marginTop: 28,
    marginLeft: "30%",
  },
  pressText: {
    marginTop: 20,
    fontSize: 30,
    color: '#EFF6FC',
    textAlign: 'center',
  }
});
