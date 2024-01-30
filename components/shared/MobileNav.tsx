'use client'
import React from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import menu from '@/menu.svg';  // Change the import statement
import { Separator } from '@radix-ui/react-separator';
import NavItems from './NavItems';

const MobileNav = () => {
  return (
    <nav className='x'>
      <Sheet>
        <SheetTrigger>
          <Image
            src={menu}
            alt="menu"
            width={24}
            height={24}
            className='menu'
          />
        </SheetTrigger>
        <SheetContent>
          <Image src="/assets/images/logo.png" alt='logo' width={128} height={38}/>
            <Separator/>
            <NavItems/>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
