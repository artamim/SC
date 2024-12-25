import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axiosInstance from "../api/axiosInstance";

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class SalesStatDistChart extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      // Fetch data from backend
      const response = await axiosInstance.get('/dashboard/salesstatdistchart');
      const chartData = response.data.map(item => ({
        name: item.xstatus,
        value: parseInt(item.cnt, 10),
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
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ fontSize: "10px", textAlign: "center"}}>Sales Order Status Distribution</div>
          </ResponsiveContainer>
          <div>
            {data.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ backgroundColor: COLORS[index % COLORS.length], width: "10px", height: "10px", marginRight: "5px" }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
    );
  }
}
