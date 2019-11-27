import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Sidebar from './sidebar';
import InboxSidebar from '../inbox/sidebar';

interface ChatProps extends RouteComponentProps { }
export function ChatPage(props: ChatProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full flex">
        <Sidebar />
        <InboxSidebar />
        <div
          className="flex flex-col flex-grow border"
          style={{ borderColor: '#efece8' }}
        >
          <div
            className="border-b h-20"
            style={{ borderColor: '#efece8' }}
          >
            header
          </div>
          <div className="flex-grow">
            content
          </div>
          <div
            className="border-t py-3 px-5"
            style={{ borderColor: '#efece8' }}
          >
            <div
              className="px-2 py-1 rounded-full"
              style={{ background: 'rgb(247, 247, 247)' }}
            >
              <div className="flex">
                <input
                  type="text"
                  style={{ color: '#666' }}
                  placeholder="Type a message here..."
                  className="text-sm bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-64"
          style={{ background: 'linear-gradient(111.18deg, #FFFFFF 10.39%, #F8F8F8 73.23%, #FFFFFF 100%)' }}
        >
          right
        </div>
      </div>
    </div>
  );
}