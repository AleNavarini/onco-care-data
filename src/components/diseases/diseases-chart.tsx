import fetcher from '@/utils/fetcher';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import BarChart from '@/components/charts/bar';
import CenteredLoading from '../ui/centered-loading';
import { useEffect, useState } from 'react';

interface DiseasesData {
    name: string;
    value: number;
}

const DiseasesChart: React.FC = () => {
    const { data, isLoading, error } = useSWR('/api/stats/diseases', fetcher);
    const [chartWidth, setChartWidth] = useState(800);

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth < 768 ? window.innerWidth - 30 : 800);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


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
                width={chartWidth}
                height={400}
            />
        </Sheet>
    );
};
export default DiseasesChart;
