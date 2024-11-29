import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { name: "Active", value: 50 },
  { name: "Expire", value: 20 },
  { name: "Pipeline", value: 70 },
];

const CompaniesBarChart: React.FC = () => {
  return (
    <div style={{ background: "#000", padding: "16px", borderRadius: "8px", color: "#fff", width: "30%" }}>
      <h3 style={{ textAlign: "center" }}>Companies</h3>
      <BarChart width={250} height={150} data={data}>
        <XAxis dataKey="name" stroke="#fff" />
        <Tooltip />
        <Bar dataKey="value" fill="#5ff" barSize={30} />
      </BarChart>
    </div>
  );
};

export default CompaniesBarChart;

