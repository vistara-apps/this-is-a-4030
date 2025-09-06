import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {children}
    </div>
  )
}

export default DashboardLayout