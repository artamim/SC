import React, { Component } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axiosInstance from "../api/axiosInstance";

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

export default class SalesStatDistChart extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      // Fetch data from backend
      const response = await axiosInstance.get('/dashboard/topfivefastmovingitemschart');
      const chartData = response.data.map(item => ({
        Item: item.xitem,
        Amount: parseInt(item.xamount, 10),
      }));
      this.setState({ data: chartData });
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    }
  }

  render() {
    const { data } = this.state;

    if (data.length === 0) {
      return <div>Loading chart data...</div>;
    }

    return (
      <div>
        <div style={{ display: "flex" }}>
          <ResponsiveContainer width="80%" height={280}>

            <ComposedChart
              layout="vertical"
              width="100%"
              height="50%"
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 80,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="Item" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Amount" barSize={20} fill="#413ea0" />
            </ComposedChart>

            <div style={{ fontSize: "10px", textAlign: "center"}}>All Time Top 5 Fast Moving Items</div>
          </ResponsiveContainer>
        </div>
      </div>
      
      
    );
  }
}
