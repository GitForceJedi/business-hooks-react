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
        <h1>Custom React Hooks - Business Logic</h1>
        <p>
          This project is meant to showcase the power of custom React Hooks, in
          the scope of Business Profit and Margin. Try adjusting both the
          Purchase Price (which influences the discount applied) and the
          Business Cost (which influences the profit margin). At the bottom of
          the left column, the profit amount is categorized into Low, Moderate,
          and High profit margins
          <p>
            Finally, the two graphs within the right column will adjust to
            reflect the amounts returned by the custom React Hooks and adjust
            their displays accordingly. This showcases the power of custom React
            Hooks working in conjunction with one another. As well as, how the
            results can be harnessed in additional elements of the website.
          </p>
        </p>

        <h2 class="main-color">useDiscountCalculator Hook</h2>
        <h3>Original Purchase Price:</h3>
        <p>
          &#40;
          <i>
            Adjust the amount below. Higher prices will trigger higher
            discounts.
          </i>
          &#41;
        </p>
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

        <h2 class="main-color">useProfitCalculator Hook</h2>
        <h3>Business Cost:</h3>
        <p>
          &#40;
          <i>
            Adjust the amount below. Profit margin and category will be
            affected.
          </i>
          &#41;
        </p>
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
        <h2 class="main-color">useProfitCategory Hook</h2>
        <h3>
          Profit Margin: <b class="main-color">{profitCategory} Margin</b>
        </h3>
      </div>

      <div className="right-panel">
        <div className="chart-container">
          <div className="chart-box">
            <h3>Monetary Values</h3>
            <br />
            <br></br>

            <BarChart
              width={700}
              height={200}
              data={[
                { name: 'Original Price', value: discountData.originalAmount },
                {
                  name: 'Discounted (Paid Price)',
                  value: discountData.discountedAmount,
                },
                { name: 'Profit Amount', value: Number(profitData.profit) },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF4500" />
            </BarChart>
          </div>
          <div className="chart-box">
            <h3>Cost vs. Profit</h3>
            <PieChart width={700} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={[
                  { name: 'Cost', value: cost },
                  { name: 'Profit', value: Number(profitData.profit) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#FF4500"
                label
              >
                <Cell fill="#333333" />
                <Cell fill="#FF4500" />
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
