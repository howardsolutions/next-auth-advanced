'use client';

import BackButton from './back-button';
import { LoginWithOAuth } from './login-with-oauth';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
          {headerLabel}
        {/* <Header label={headerLabel} /> */}
        </CardHeader>
      
      <CardContent>{children}</CardContent>
      
      {showSocial && (
        <CardFooter>
          <LoginWithOAuth />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
