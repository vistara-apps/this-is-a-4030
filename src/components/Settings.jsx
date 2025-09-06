import React, { useState } from 'react'
import { User, Bell, Link, CreditCard, Shield, HelpCircle } from 'lucide-react'

const Settings = ({ user, setUser }) => {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    newOpportunities: true,
    earningsUpdates: true,
    weeklyReports: false,
    promotions: false
  })

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'platforms', label: 'Connected Platforms', icon: Link },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ]

  const platforms = [
    { name: 'Survey Junkie', connected: true, earnings: '$125.50' },
    { name: 'Swagbucks', connected: true, earnings: '$89.25' },
    { name: 'TaskRabbit', connected: true, earnings: '$234.00' },
    { name: 'Upwork', connected: false, earnings: '$0.00' },
    { name: 'Amazon MTurk', connected: false, earnings: '$0.00' },
    { name: 'UserTesting', connected: false, earnings: '$0.00' },
  ]

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Email Address</label>
          <input
            type="email"
            value={user.email}
            className="w-full px-3 py-2 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text mb-2">Subscription Tier</label>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${
              user.subscriptionTier === 'pro' ? 'bg-accent/10 text-accent' : 'bg-muted/10 text-muted'
            }`}>
              {user.subscriptionTier}
            </span>
            {user.subscriptionTier === 'free' && (
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text">Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </h4>
              <p className="text-sm text-muted">
                {key === 'newOpportunities' && 'Get notified when new earning opportunities are found'}
                {key === 'earningsUpdates' && 'Receive updates when your earnings are processed'}
                {key === 'weeklyReports' && 'Weekly summary of your earning activities'}
                {key === 'promotions' && 'Special offers and platform promotions'}
              </p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-primary' : 'bg-muted/30'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text">Connected Platforms</h3>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Connect New Platform
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="border border-muted/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-text">{platform.name}</h4>
              <div className={`w-3 h-3 rounded-full ${
                platform.connected ? 'bg-accent' : 'bg-muted/30'
              }`} />
            </div>
            
            <p className="text-sm text-muted mb-3">
              Total earnings: <span className="font-medium text-text">{platform.earnings}</span>
            </p>
            
            <button className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              platform.connected
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}>
              {platform.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'platforms':
        return renderPlatformSettings()
      case 'billing':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Billing & Subscription</h3>
            <div className="bg-muted/5 rounded-lg p-6">
              <p className="text-muted">Billing settings coming soon...</p>
            </div>
          </div>
        )
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Privacy & Security</h3>
            <div className="bg-muted/5 rounded-lg p-6">
              <p className="text-muted">Privacy settings coming soon...</p>
            </div>
          </div>
        )
      case 'help':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Help & Support</h3>
            <div className="bg-muted/5 rounded-lg p-6">
              <p className="text-muted">Support center coming soon...</p>
            </div>
          </div>
        )
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text mb-2">Settings</h2>
        <p className="text-muted">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {settingSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-muted hover:bg-muted/10 hover:text-text'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-surface rounded-lg p-6 shadow-card">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings