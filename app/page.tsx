import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1 className='font-semibold text-green-400'>Hello Auth</h1>
      <Button variant={"outline"} size={"lg"}>Click me</Button>
    </div>
  );
}
