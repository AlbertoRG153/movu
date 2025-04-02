"use client";

import React from 'react';
import Image from "next/image";

const MainViewPage = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
      <div className="w-12 h-12">
        <Image src="/camion.png" alt="Camión" width={48} height={48} />
      </div>

      <span className="mt-2 text-gray-700 font-medium text-sm">Flete</span>
    </div>
  );
};

export default MainViewPage;