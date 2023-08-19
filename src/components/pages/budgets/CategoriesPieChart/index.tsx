import { BudgetCategoryResponse } from '@/api-client';
import { Colors } from '@/constants/colors';
import { Box } from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';

ChartJS.register(...registerables);

/**
 * Unified interface allowing use of pie chart for either
 * budget categories or expenses by category
 */
export interface PieChartCategory {
  category: BudgetCategoryResponse;
  rawAmount: number;
}

interface CategoriesPieChartProps {
  categories: PieChartCategory[];
}

export const CategoriesPieChart = ({ categories }: CategoriesPieChartProps) => {
  const chartOptions = {};

  const chartData = {
    labels: categories.map((category) => category.category.name),
    datasets: [
      {
        data: categories.map((category) => category.rawAmount),
        backgroundColor: Colors.CHART_COLORS,
      },
    ],
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      marginTop={2}
    >
      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
};
