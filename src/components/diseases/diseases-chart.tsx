import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import CenteredLoading from '../ui/centered-loading';
import { CartesianGrid, XAxis, Bar, BarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

const DiseasesChart: React.FC = () => {
  const { data, isLoading, error } = useSWR('/api/stats/diseases', fetcher);

  if (isLoading) return <CenteredLoading />;
  if (error) return <div>Error: {error.message}</div>;

  const chartConfig = {
    active: {
      label: 'Activa',
    },
  } satisfies ChartConfig;

  const colorVars = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const dataWithColors = data.map((item, index) => ({
    ...item,
    fill: colorVars[index % colorVars.length],
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] max-h-full w-full">
      <BarChart data={dataWithColors}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="value"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};
export default DiseasesChart;
