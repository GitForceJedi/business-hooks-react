import React, { useState } from 'react';
import './App.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import useDiscountCalculator from './hooks/useDiscountCalculator';
import useProfitCalculator from './hooks/useProfitCalculator';
import useProfitCategory from './hooks/useProfitCategory';

function App() {
  const [amount, setAmount] = useState(2000);
  const discountData = useDiscountCalculator(amount);
  const [cost, setCost] = useState(1200);
  const profitData = useProfitCalculator(cost, discountData.discountedAmount);
  const profitCategory = useProfitCategory(Number(profitData.profit));

  return (
    <div className="two-column-layout">
      <div
        className="left-panel"
        style={{ padding: '2rem', fontFamily: 'Arial' }}
      >
        <h1>Custom React Hooks - Business</h1>
        <p>
          This project is meant to showcase the power of custom React Hooks, in
          the scope of Business Profit and Margin. Try adjusting both the
        </p>

        <h2>useDiscountCalculator</h2>
        <h3>Customer Purchase Amount:</h3>
        <input
          type="text"
          inputMode="decimal"
          pattern="\d*"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter purchase amount"
        />
        <p>Original: ${discountData.originalAmount}</p>
        <p>Discount: {discountData.discountRate * 100}%</p>
        <p>Final: ${discountData.discountedAmount}</p>

        <h2>useProfitCalculator</h2>
        <h3>Business Cost Amount:</h3>
        <input
          type="text"
          inputMode="decimal"
          pattern="\d*"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          placeholder="Enter cost amount"
        />
        <p>Cost Price: ${cost}</p>
        <p>Sale Price (after discount): ${discountData.discountedAmount}</p>
        <p>Profit: ${profitData.profit}</p>
        <p>Margin: {profitData.marginPercent}%</p>
        <h2>useProfitCategory</h2>
        <p>Category: {profitCategory}</p>
      </div>

      <div className="right-panel">
        <div className="chart-container">
          <div className="chart-box">
            <h3>Bar Chart</h3>
            <BarChart
              width={500}
              height={200}
              data={[
                { name: 'Original', value: discountData.originalAmount },
                { name: 'Discounted', value: discountData.discountedAmount },
                { name: 'Profit', value: Number(profitData.profit) },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="chart-box">
            <h3>Pie Chart</h3>
            <PieChart width={500} height={200}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={[
                  { name: 'Cost', value: cost },
                  { name: 'Profit', value: Number(profitData.profit) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#82ca9d"
                label
              >
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
