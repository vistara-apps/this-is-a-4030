import React, { useState } from 'react'
import { Play, Pause, Settings, Plus, Zap, Clock, CheckCircle } from 'lucide-react'

const TaskAutomation = ({ user }) => {
  const [automations, setAutomations] = useState([
    {
      id: 'auto1',
      name: 'Daily Survey Check',
      description: 'Automatically checks for new high-paying surveys every morning',
      platform: 'Survey Junkie',
      status: 'active',
      lastRun: '2024-01-15T09:00:00Z',
      earnings: 15.50,
      frequency: 'Daily at 9:00 AM'
    },
    {
      id: 'auto2',
      name: 'Video Reward Collector',
      description: 'Watches video ads and collects rewards during idle time',
      platform: 'Swagbucks',
      status: 'paused',
      lastRun: '2024-01-14T14:30:00Z',
      earnings: 8.25,
      frequency: 'Every 2 hours'
    },
    {
      id: 'auto3',
      name: 'Task Notifier',
      description: 'Sends notifications for high-value tasks that match your skills',
      platform: 'Multiple',
      status: 'active',
      lastRun: '2024-01-15T16:45:00Z',
      earnings: 0,
      frequency: 'Real-time'
    }
  ])

  const toggleAutomation = (id) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ))
  }

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-accent bg-accent/10' : 'text-yellow-600 bg-yellow-100'
  }

  const automationTemplates = [
    {
      name: 'Form Filler Pro',
      description: 'Auto-fills common survey and sign-up forms',
      category: 'Data Entry',
      estimatedSavings: '2-3 hours/week'
    },
    {
      name: 'Receipt Scanner',
      description: 'Automatically scans and submits receipts for cashback',
      category: 'Cashback',
      estimatedSavings: '30 min/week'
    },
    {
      name: 'Task Prioritizer',
      description: 'Ranks available tasks by hourly rate and difficulty',
      category: 'Optimization',
      estimatedSavings: '1 hour/week'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text mb-2">Task Automation</h2>
          <p className="text-muted">Automate repetitive tasks to maximize your earning efficiency</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Active Automations */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-4">Active Automations</h3>
        <div className="space-y-4">
          {automations.map((automation) => (
            <div key={automation.id} className="border border-muted/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-text">{automation.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(automation.status)}`}>
                      {automation.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted mb-2">{automation.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{automation.frequency}</span>
                    </span>
                    <span>Platform: {automation.platform}</span>
                    <span>Last run: {new Date(automation.lastRun).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-sm text-muted">Earned</p>
                    <p className="font-semibold text-accent">${automation.earnings.toFixed(2)}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      automation.status === 'active'
                        ? 'bg-accent/10 text-accent hover:bg-accent/20'
                        : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    }`}
                  >
                    {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                  <button className="p-2 hover:bg-muted/10 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-muted" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Templates */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-4">Automation Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {automationTemplates.map((template, index) => (
            <div key={index} className="border border-muted/20 rounded-lg p-4 hover:border-primary/30 transition-colors">
              <div className="mb-3">
                <h4 className="font-semibold text-text mb-1">{template.name}</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{template.category}</span>
              </div>
              
              <p className="text-sm text-muted mb-3">{template.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-accent">
                  <Zap className="w-3 h-3" />
                  <span>Saves {template.estimatedSavings}</span>
                </div>
                
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  Set Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Tasks Automated</p>
              <p className="text-2xl font-bold text-text">142</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Time Saved</p>
              <p className="text-2xl font-bold text-text">8.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Extra Earnings</p>
              <p className="text-2xl font-bold text-text">$23.75</p>
            </div>
          </div>
        </div>
      </div>

      {user.subscriptionTier === 'free' && (
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Unlock Advanced Automation</h3>
          <p className="text-white/90 mb-4">
            Upgrade to Pro to access advanced automation features, custom scripting, and priority support.
          </p>
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskAutomation