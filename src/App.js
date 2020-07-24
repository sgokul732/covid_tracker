import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Cards, CountryPicker, Chart } from "./components";
import image from './images/image.png'
class App extends Component {
  state = {
    data: {},
    country:''
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange=async(country)=>{
    const fetchedData = await fetchData(country);
     this.setState({ data: fetchedData ,country:country});
  }
  render() {
    const { data ,country} = this.state;
    return (
      <div className={styles.container}>
        <img src={image} alt='COVID-19' className={styles.img}/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    );
  }
}
export default App;
