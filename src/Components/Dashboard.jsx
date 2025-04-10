import React from 'react'
import Sidebar from './Sidebar';


export default function Dashboard() {
  return (
    <>
         
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Welcome to Dashboard</h4>
      </div>

     
      <div className="flex min-h-[calc(100vh-64px)]">
        
        <Sidebar userName="Darshi" />

      
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center max-w-[600px]">
            <h2 className="font-bold text-2xl mb-5 text-[#1E3A8A]">Have a chat seat</h2>
            <p className="font-medium mb-4 text-gray-700">
              The purpose behind setting up chat seat is to connect members of the community through conversation.
            </p>
            <p className="font-medium mb-4 text-gray-700">
              You may find a chat seat in a library or shopping centre. You will recognise them by a banner such as one shown.
            </p>
          </div>
        </div>
      </div>
      
  
     </>
  )
}

