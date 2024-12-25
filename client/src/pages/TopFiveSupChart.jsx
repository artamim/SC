import React, { Component } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from "../api/axiosInstance";

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

export default class SalesStatDistChart extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      // Fetch data from backend
      const response = await axiosInstance.get('/dashboard/topfivesupchart');
      const chartData = response.data.map(item => ({
        name: item.xorg,
        CollectionAmount: parseInt(item.colamt, 10),
        Sales: parseInt(item.salesamt, 10),
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
          <ResponsiveContainer width="100%" height={280}>

            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="CollectionAmount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="Sales" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>

            <div style={{ fontSize: "10px", textAlign: "center"}}>All Time Top 5 Supplier</div>
          </ResponsiveContainer>
        </div>
      </div>
      
      
    );
  }
}
