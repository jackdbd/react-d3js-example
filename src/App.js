import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import Preloader from './components/Preloader';
import { loadAllData } from './DataHandling';
// import CountyMap from './components/CountyMap';

class App extends Component {
  state = {
    techSalaries: [],
    countyNames: [],
    medianIncomes: []
  }

  // start data loading before mounting the React component (some say this is an anti-pattern)
  componentWillMount() {
    loadAllData(data => this.setState(data));
  }

  countyValue(county, techSalariesMap) {
    const medianHousehold = this.state.medianIncomes[county.id]
    const salaries = techSalariesMap[county.name];

    if (!medianHousehold || !salaries) {
      return null;
    }

    const median = d3.median(salaries, d => d.base_salary);

    return {
       countyID: county.id,
       value: median - medianHousehold.medianIncome
      };
    }

  render() {
    if (this.state.techSalaries.length < 1) {
      return (
        <Preloader />
      );
    }

    return (
      <div className="App container">
        <h1>Loaded {this.state.techSalaries.length} salaries</h1>
      </div>
    );
  }
}

export default App;
