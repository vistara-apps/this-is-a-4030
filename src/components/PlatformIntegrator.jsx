import React, { useState, useEffect } from 'react'
import { Plus, Link, Unlink, RefreshCw, CheckCircle, AlertCircle, Settings } from 'lucide-react'
import dataService from '../services/dataService'

const PlatformIntegrator = ({ user, variant = 'manage' }) => {
  const [platforms, setPlatforms] = useState([])
  const [connectedPlatforms, setConnectedPlatforms] = useState(user.linkedPlatforms || [])
  const [loading, setLoading] = useState(false)
  const [syncingPlatform, setSyncingPlatform] = useState(null)

  useEffect(() => {
    loadPlatforms()
  }, [])

  const loadPlatforms = () => {
    const supportedPlatforms = dataService.getSupportedPlatforms()
    setPlatforms(supportedPlatforms)
  }

  const handleConnect = async (platform) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (!connectedPlatforms.includes(platform.name)) {
        setConnectedPlatforms(prev => [...prev, platform.name])
        
        // Show success message
        console.log(`Connected to ${platform.name}`)
      }
    } catch (error) {
      console.error('Failed to connect platform:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (platformName) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setConnectedPlatforms(prev => prev.filter(p => p !== platformName))
      console.log(`Disconnected from ${platformName}`)
    } catch (error) {
      console.error('Failed to disconnect platform:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async (platformName) => {
    setSyncingPlatform(platformName)
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`Synced data from ${platformName}`)
    } catch (error) {
      console.error('Failed to sync platform:', error)
    } finally {
      setSyncingPlatform(null)
    }
  }

  const getPlatformIcon = (category) => {
    const icons = {
      surveys: '📊',
      mixed: '🎯',
      gigs: '🛠️',
      freelance: '💼',
      testing: '🧪',
      evaluation: '⭐'
    }
    return icons[category] || '🔗'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      hard: 'text-red-600 bg-red-100'
    }
    return colors[difficulty] || 'text-gray-600 bg-gray-100'
  }

  const getTimeCommitmentColor = (timeCommitment) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    }
    return colors[timeCommitment] || 'text-gray-600 bg-gray-100'
  }

  if (variant === 'connect') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-text mb-2">Connect New Platform</h3>
          <p className="text-muted">Choose a platform to start earning from</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms
            .filter(platform => !connectedPlatforms.includes(platform.name))
            .map((platform) => (
              <div key={platform.id} className="bg-surface rounded-lg p-6 shadow-card card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPlatformIcon(platform.category)}</span>
                    <div>
                      <h4 className="font-semibold text-text">{platform.name}</h4>
                      <p className="text-sm text-muted capitalize">{platform.category}</p>
                    </div>
                  </div>
                  {platform.apiSupported ? (
                    <CheckCircle className="w-5 h-5 text-accent" title="API Supported" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" title="Manual Integration" />
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Avg Payout</span>
                    <span className="text-sm font-medium text-text">${platform.avgPayout}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Difficulty</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(platform.difficulty)}`}>
                      {platform.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Time Commitment</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTimeCommitmentColor(platform.timeCommitment)}`}>
                      {platform.timeCommitment}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(platform)}
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>
            ))}
        </div>

        {platforms.filter(p => !connectedPlatforms.includes(p.name)).length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text mb-2">All Platforms Connected</h3>
            <p className="text-muted">You've connected to all available platforms</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-text mb-2">Connected Platforms</h3>
          <p className="text-muted">Manage your platform integrations</p>
        </div>
        
        <button
          onClick={() => window.location.hash = '#connect-platform'}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Platform</span>
        </button>
      </div>

      {connectedPlatforms.length === 0 ? (
        <div className="text-center py-12 bg-surface rounded-lg">
          <Link className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">No Platforms Connected</h3>
          <p className="text-muted mb-4">Connect to platforms to start tracking your earnings</p>
          <button
            onClick={() => window.location.hash = '#connect-platform'}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Connect Your First Platform
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedPlatforms.map((platformName) => {
            const platform = platforms.find(p => p.name === platformName)
            if (!platform) return null

            const isConnected = true
            const lastSync = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
            const isSyncing = syncingPlatform === platformName

            return (
              <div key={platform.id} className="bg-surface rounded-lg p-6 shadow-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPlatformIcon(platform.category)}</span>
                    <div>
                      <h4 className="font-semibold text-text">{platform.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-accent' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-muted">
                          {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSync(platformName)}
                      disabled={isSyncing}
                      className="p-2 text-muted hover:text-text hover:bg-muted/10 rounded-lg transition-colors"
                      title="Sync Data"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                    
                    <button
                      className="p-2 text-muted hover:text-text hover:bg-muted/10 rounded-lg transition-colors"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Last Sync</span>
                    <span className="text-sm text-text">
                      {lastSync.toLocaleDateString()} {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Status</span>
                    <span className={`text-sm ${platform.apiSupported ? 'text-accent' : 'text-yellow-600'}`}>
                      {platform.apiSupported ? 'Auto-sync' : 'Manual'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSync(platformName)}
                    disabled={isSyncing}
                    className="flex-1 bg-accent/10 text-accent py-2 px-4 rounded-lg font-medium hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSyncing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Sync</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDisconnect(platformName)}
                    disabled={loading}
                    className="bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    title="Disconnect"
                  >
                    <Unlink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Connection Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Connection Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Platforms with API support sync automatically every hour</li>
          <li>• Manual platforms require you to input earnings manually</li>
          <li>• Keep your platform credentials secure and up to date</li>
          <li>• Sync regularly to ensure accurate earnings tracking</li>
        </ul>
      </div>
    </div>
  )
}

export default PlatformIntegrator
