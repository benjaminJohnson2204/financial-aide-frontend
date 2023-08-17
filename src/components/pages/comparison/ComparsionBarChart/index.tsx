import { BudgetCategoryResponse } from '@/api-client';
import { Colors } from '@/constants/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  BarElement,
} from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export interface ComparisonBarChartCategory {
  category: BudgetCategoryResponse;
  plannedAmount: number;
  actualAmount: number;
}

interface ComparisonBarChartProps {
  categories: ComparisonBarChartCategory[];
}

export const ComparisonBarChart = ({ categories }: ComparisonBarChartProps) => {
  console.log(categories);
  const chartData = {
    labels: categories.map((category) => category.category.name),
    datasets: [
      {
        label: 'Planned',
        data: categories.map((category) => category.plannedAmount),
        backgroundColor: Colors.DARK_GREEN,
      },
      {
        label: 'Actual',
        data: categories.map((category) => category.actualAmount),
        backgroundColor: Colors.DARK_PURPLE,
      },
    ],
  };

  const chartOptions = {};

  return <Chart type='bar' data={chartData} options={chartOptions} />;
};
