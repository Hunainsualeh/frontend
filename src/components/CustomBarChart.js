import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import styled from "styled-components";

// Styled Components for Tooltip
const CustomTooltip = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
`;

const TooltipText = styled.p`
  margin: 0;
  font-weight: 500;
  color: #333;
`;

const TooltipMain = styled.h3`
  margin: 0;
  font-weight: bold;
  color: #007bff;
`;

// Custom Tooltip Component
const CustomTooltipContent = ({ active, payload, dataKey }) => {
    if (active && payload && payload.length) {
        const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

        return (
            <CustomTooltip>
                {dataKey === "attendancePercentage" ? (
                    <>
                        <TooltipMain>{subject}</TooltipMain>
                        <TooltipText>Attended: ({attendedClasses}/{totalClasses})</TooltipText>
                        <TooltipText>{attendancePercentage}%</TooltipText>
                    </>
                ) : (
                    <>
                        <TooltipMain>{subName.subName}</TooltipMain>
                        <TooltipText>Marks: {marksObtained}</TooltipText>
                    </>
                )}
            </CustomTooltip>
        );
    }

    return null;
};

// Main Bar Chart Component
const CustomBarChart = ({ chartData, dataKey }) => {
    const subjects = chartData.map((data) => data.subject);
    const distinctColors = generateDistinctColors(subjects.length);

    return (
        <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
            <Bar dataKey={dataKey} fill="url(#colorGradient)">
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={distinctColors[index]} />
                ))}
            </Bar>
            <defs>
                <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    {distinctColors.map((color, index) => (
                        <stop key={index} offset={`${index / (distinctColors.length - 1) * 100}%`} stopColor={color} />
                    ))}
                </linearGradient>
            </defs>
        </BarChart>
    );
};

// Helper function to generate distinct colors
const generateDistinctColors = (count) => {
    const colors = [];
    const goldenRatioConjugate = 0.618033988749895;

    for (let i = 0; i < count; i++) {
        const hue = (i * goldenRatioConjugate) % 1;
        const color = hslToRgb(hue, 0.7, 0.5); // Increased saturation for more vibrant colors
        colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }

    return colors;
};

// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart;
