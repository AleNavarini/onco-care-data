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
      color: '#2563ec',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-active)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
export default DiseasesChart;
