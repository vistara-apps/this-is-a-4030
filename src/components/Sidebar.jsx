import React from 'react'
import { BarChart3, Search, Gift, Zap, Settings, DollarSign } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'opportunities', label: 'Opportunities', icon: Search },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="hidden sm:flex sm:flex-col w-64 bg-surface border-r border-muted/20">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted hover:bg-muted/10 hover:text-text'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-muted/20">
        <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
          <p className="text-sm opacity-90 mb-3">Get advanced analytics and automation</p>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar