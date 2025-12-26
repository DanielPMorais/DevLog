import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ logs }) {
  return (
    <div className="bg-[#181b1f] p-4 rounded-xl border border-gray-800 shadow-sm mb-6 h-64">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">
        Atividade Recente
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={logs.slice(0, 10).reverse()}>
          <XAxis dataKey="created_at" hide />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
          />
          <Line
            type="monotone"
            dataKey="id"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
