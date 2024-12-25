import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#4f8eeb', '#ff6b6b', '#ffcc29', '#34c38f']; // Updated modern color palette

// Custom label rendering function with black text
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontWeight: '600', fontSize: '1rem' }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomPieChart = ({ data }) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', padding: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius="75%"
                        innerRadius="40%"
                        dataKey="value"
                        isAnimationActive
                        paddingAngle={5}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`url(#grad-${index % COLORS.length})`}
                                style={{ transition: 'transform 0.3s ease-in-out' }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        ))}
                    </Pie>

                    {/* Define gradient for a modern look */}
                    <defs>
                        {COLORS.map((color, index) => (
                            <linearGradient key={index} id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={color} stopOpacity={1} />
                            </linearGradient>
                        ))}
                    </defs>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '10px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            color: '#333',
                        }}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};
export default CustomPieChart;
