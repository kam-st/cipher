import * as React from 'react';

import Link from 'next/link';

import { Icons } from '@/components/misc/icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { useLockBody } from '@/hooks/use-lock-body';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';

import { ScrollArea } from '../ui/scroll-area';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNav({
  items,
  children,
  open,
  onOpenChange,
}: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='left'>
        <ScrollArea className='h-full'>
          <SheetHeader>
            <SheetTitle>
              <Link href='/' className='flex items-center space-x-2'>
                <Icons.logo />
                <span className='font-bold'>{siteConfig.name}</span>
              </Link>
            </SheetTitle>
            <SheetDescription className=''>
              <div className='text-popover-foreground'>
                <nav className='grid grid-flow-row auto-rows-max text-sm'>
                  {items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.disabled ? '#' : item.href}
                      className={cn(
                        'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                        item.disabled && 'cursor-not-allowed opacity-60'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                {children}
              </div>
            </SheetDescription>
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
