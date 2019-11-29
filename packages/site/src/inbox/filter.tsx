import React from 'react';
import { ReactComponent as MagnifyIcon } from './magnifying-glass.svg';
export default function Filter() {
  return (
    <div className="py-6 px-6 border-b" style={{ borderColor: '#efece8', height: '6.55rem' }}>
      <div className="px-2 py-1 rounded-full" style={{ background: 'rgb(247, 247, 247)' }}>
        <div className="flex">
          <MagnifyIcon fill="#dadada" className="w-4 mx-1" />
          <input
            type="text"
            style={{ color: '#666' }}
            spellCheck={false}
            placeholder="Search..."
            className="text-sm bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
