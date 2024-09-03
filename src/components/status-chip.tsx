import { getStatus } from '@/utils/get-status';
import { Badge } from './ui/badge';

interface Props {
  status: string;
  size?: 'md' | 'lg';
}

export default function StatusChip({ status, size = 'md' }: Props) {
  const classname =
    getStatus(status) === 'Activa'
      ? 'border-green-500 text-green-500 dark:border-green-800 dark:text-green-800'
      : 'border-purple-500 text-purple-500 dark:border-purple-800 dark:text-purple-800';
  return (
    <Badge variant="outline" className={classname}>
      {getStatus(status)}
    </Badge>
  );
}
