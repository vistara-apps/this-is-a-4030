import React from 'react'
import { Bell, User, Settings } from 'lucide-react'

const Header = ({ user }) => {
  return (
    <header className="bg-surface border-b border-muted/20 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ES</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-text">EarnSmart Hub</h1>
              <p className="text-sm text-muted hidden sm:block">Your All-in-One Dashboard to Maximize Micro-Earnings</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-sm text-accent font-medium capitalize">{user.subscriptionTier}</span>
          </div>
          
          <button className="p-2 hover:bg-muted/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-muted" />
          </button>
          
          <button className="p-2 hover:bg-muted/10 rounded-lg transition-colors">
            <User className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header