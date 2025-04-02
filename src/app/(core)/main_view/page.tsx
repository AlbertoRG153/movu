"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainViewPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    username: '',
    isLoggedIn: false
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          email: parsedUser.email,
          username: parsedUser.username || parsedUser.email.split('@')[0], 
          isLoggedIn: true
        });
      } else {
        router.replace('/login');
      }
    }
  }, [router]);

  return (
    <div className="mobile-container max-w-md mx-auto h-screen flex flex-col font-sans">
      <div className="bg-[#1e3a4c] text-white p-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            <span>{user.username ? user.username[0].toUpperCase() : "?"}</span>
          </div>
          <div>
            <div>{user.username || 'username'}</div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainViewPage;
