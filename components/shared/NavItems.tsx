'use client';
import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import './style.css';
const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className='s'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li className='li'  key={link.route}>
            <Link href={link.route}>
              <div className={isActive ? 'active' : ''}>{link.label}</div>
            </Link>
            
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
