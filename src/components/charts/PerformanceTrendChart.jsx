import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceTrendChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis dataKey="month" stroke="#ffffff50" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
        <YAxis stroke="#ffffff50" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={[60, 100]} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '8px', color: '#fff' }}
          itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
        />
        <Line 
          type="monotone" 
          dataKey="score" 
          stroke="#10b981" 
          strokeWidth={4}
          dot={{ fill: '#0f172a', stroke: '#10b981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#10b981', stroke: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendChart;
