import fetcher from '@/utils/fetcher';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import BarChart from '@/components/charts/bar';

interface DiseasesData {
    name: string;
    value: number;
}

const DiseasesChart: React.FC = () => {
    const { data, isLoading, error } = useSWR('/api/stats/diseases', fetcher);

    if (isLoading) return <CenteredLoading />;
    if (error) return <div>Error: {error.message}</div>;

    const transformedData = data.map((disease: DiseasesData) => ({
        name: disease.name.split(' ').pop() || disease.name,
        value: disease.value,
    }));

    return (
        <Sheet>
            <BarChart
                data={transformedData}
                width={600}
                height={400}
            />
        </Sheet>
    );
};
export default DiseasesChart;
