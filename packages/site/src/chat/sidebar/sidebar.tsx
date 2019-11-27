import React from 'react';
import Image from './image.svg';
import { ReactComponent as Home } from './images/home.svg';
import { ReactComponent as Airplane } from './images/airplane.svg';

export default function Sidebar() {
  return (
    <div
      style={{ background: '#292f4c' }}
    >
      <img src={Image} />

      <div className="h-16 flex">
        <div className="w-1"></div>
        <div className="h-full w-full flex items-center justify-center mr-2 opacity-25">
          <Home className="text-white" />
        </div>
      </div>
      <div className="h-16 flex">
        <div className="bg-red-600 w-1"></div>
        <div className="h-full w-full flex items-center justify-center mr-2">
          <Airplane className="text-white" />
        </div>
      </div>
    </div>
  )
}