import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const Grafica = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      try {
          const fetchData = async () => {
              const response = await fetch(`http://127.0.0.1:5000//contenido_graficas/Madrid`);
              if (!response.ok) {
                  throw new Error('Error al obtener el contenido de las graficas');
              }
              const dataRes = await response.json();
              const temp = [{name: "cultural", value: parseInt(dataRes["cultural"])},
              {name: "family", value: parseInt(dataRes["family"])},
              {name: "leisure", value: parseInt(dataRes["leisure"])}]

              setData(temp);

          };
          fetchData();
      } catch (error) {
          console.error('Error al obtener los datos:', error);
      }
  }, []);

  
  

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

 
  return (
      <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
      </PieChart>
    );
};

export default Grafica;