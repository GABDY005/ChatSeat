import React from 'react'
import AdminSidebar from './AdminSidebar';


function AdminResources() {
    return(
         <>
                    <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
                <h4 className="text-xl font-bold">Resources</h4>
              </div>
        
              <div className="flex min-h-[calc(100vh-64px)] bg-[#f0f6fa]">
                      <AdminSidebar userName="Tricia" />
                      </div>
                </>
            
    )
    
}
export default AdminResources;