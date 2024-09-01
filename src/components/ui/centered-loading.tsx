import { CircularProgress } from '@mui/joy';
import CenteredPage from './centered-page';

export default function CenteredLoading() {
  return (
    <CenteredPage>
      <CircularProgress />
    </CenteredPage>
  );
}
