import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Nitrogen", value: 70 },
  { name: "Phosphorus", value: 45 },
  { name: "Potassium", value: 60 },
];

export default function SoilGraph() {

  return (

    <div className="card card-p">

      <h3>Soil Nutrient Graph</h3>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#24430b"
            barSize={60}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}