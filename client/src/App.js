import React, { Component } from 'react';
import './App.css';
import SignIn from './components/signin/signin';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const graph_data={
  data_bar:[],
  data_pie:[]
}

const chartConfigs = {
  type: 'column2d',// The chart type
  width: '550', // Width of the chart
  height: '350', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: { 
      // Chart Configuration 
      "chart": {
          "caption": "Bar Graph",
          "xAxisName": "X",
          "yAxisName": "Y",
          "numberSuffix": "",
          "theme": "fusion",
      },
      // Chart Data
      "data":graph_data.data_bar
  }
};

const chartConfigs2 = {
type: 'doughnut3d',// The chart type
width: '550', // Width of the chart
height: '350', // Height of the chart
dataFormat: 'json', // Data type
dataSource: { 
    // Chart Configuration 
    "chart": {
      "caption": "Pie Chart",
      "startingAngle": "310",
      "showTooltip": "0",
      "decimals": "0",
      "theme": "fusion"
    },
    // Chart Data
    "data":graph_data.data_pie
}
};


const initialState = {
  route:'signin',
  isSignedIn: false,
  data:[],
  data_pie:[]
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  componentWillMount(){
    this.getData_bar();
    this.getData_pie();
  }
  
  getData_pie = () => {
    fetch('http://localhost:8000/data')
      .then(response => response.json())
      .then(response=>graph_data.data_pie.push(...response.data))
      .catch(err=>console.error(err))
  }

  getData_bar = () => {
    fetch('http://localhost:8000/data_pie')
      .then(response => response.json())
      .then(response=>graph_data.data_bar.push(...response.data))
      .catch(err=>console.error(err))
  }
  
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render() {
    return (
      <div className="App">
        {
          this.state.route==='home'?
          (
          <div className='flex justify-center'>
            <div><h1 className='blue'>My Dashboard</h1><hr/>
            <div className="flex justify-center">
              <div>
                <ReactFC
                {...chartConfigs}/>
              </div>  
              <div>
              <ReactFC
              {...chartConfigs2}/>
              </div>
            </div>  
            </div> 
          </div>
             
          )
          :
          <SignIn onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
