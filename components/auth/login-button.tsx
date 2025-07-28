'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  function onClickAuth() {
    router.push("/auth/login")
  }

  return (
    <div
      className='cursor-pointer'
      onClick={onClickAuth}
    >
      {children}
    </div>
  );
}
