import useUser from '@/hooks/use-user';
import { Avatar, AvatarFallback } from './avatar';

export default function UserAvatar() {
  const user = useUser();
  return (
    <Avatar>
      <AvatarFallback>{user?.name?.[0]} </AvatarFallback>
    </Avatar>
  );
}
