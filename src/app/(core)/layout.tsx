"use client";

import { SidebarController } from '@/components/sidebar/sidebar_controller';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Verificar si la ruta comienza con alguno de estos patrones
  //revisar esto ya que tiene cambios (pendiente)
  const routePatternsWithoutSidebar = ['/customer/profile', '/customer/profile/settings','/customer/profile/cities',
                                       '/carrier/profile','/carrier/profile/settings','/carrier/profile/cities'
                                      ];
  
  const shouldShowSidebar =! routePatternsWithoutSidebar.some(pattern => 
    pathname.startsWith(pattern)
  );
  

  return (
    <>
      {shouldShowSidebar && <SidebarController />}
      {children}
    </>
  );
}