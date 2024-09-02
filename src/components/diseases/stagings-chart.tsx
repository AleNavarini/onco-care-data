import fetcher from '@/utils/fetcher';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import BarChart from '@/components/charts/bar';
import CenteredLoading from '../ui/centered-loading';
import { useEffect, useState } from 'react';

const StagingsChart: React.FC = () => {
  const { data, isLoading, error } = useSWR('/api/stats/stagings', fetcher);
  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? window.innerWidth - 16 : 800);
    };

    handleResize(); // Set the initial width based on the current window size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) return <CenteredLoading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Sheet>
      <BarChart data={data} width={chartWidth} height={400} />
    </Sheet>
  );
};

export default StagingsChart;
