import fetcher from '@/utils/fetcher';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import BarChart from '@/components/charts/bar';
import CenteredLoading from '../ui/centered-loading';


const StagingsChart: React.FC = () => {
    const { data, isLoading, error } = useSWR('/api/stats/stagings', fetcher);

    if (isLoading) return <CenteredLoading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Sheet>
            <BarChart
                data={data}
                width={800}
                height={400}
            />
        </Sheet>
    );
};
export default StagingsChart;
