import React, { useState } from 'react'
import DashboardLayout from './components/DashboardLayout'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import UnifiedDashboard from './components/UnifiedDashboard'
import OpportunityScout from './components/OpportunityScout'
import RewardUtilityHub from './components/RewardUtilityHub'
import TaskAutomation from './components/TaskAutomation'
import Analytics from './components/Analytics'
import PlatformIntegrator from './components/PlatformIntegrator'
import Settings from './components/Settings'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState({
    userId: 'user_123',
    email: 'user@example.com',
    subscriptionTier: 'free',
    linkedPlatforms: ['Survey Junkie', 'Swagbucks', 'TaskRabbit']
  })

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <UnifiedDashboard user={user} />
      case 'opportunities':
        return <OpportunityScout user={user} />
      case 'rewards':
        return <RewardUtilityHub user={user} />
      case 'automation':
        return <TaskAutomation user={user} />
      case 'analytics':
        return <Analytics user={user} />
      case 'platforms':
        return <PlatformIntegrator user={user} variant="manage" />
      case 'connect-platform':
        return <PlatformIntegrator user={user} variant="connect" />
      case 'settings':
        return <Settings user={user} setUser={setUser} />
      default:
        return <UnifiedDashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <DashboardLayout>
        <Header user={user} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="animate-fade-in">
              {renderActiveComponent()}
            </div>
          </main>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default App
