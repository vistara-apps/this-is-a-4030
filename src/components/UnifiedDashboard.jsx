import React, { useState, useEffect } from 'react'
import EarningCard from './EarningCard'
import { TrendingUp, DollarSign, Calendar, Target, RefreshCw, Plus } from 'lucide-react'
import dataService from '../services/dataService'

const UnifiedDashboard = ({ user }) => {
  const [earnings, setEarnings] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadEarnings()
  }, [user.userId])

  const loadEarnings = async () => {
    setLoading(true)
    try {
      const data = await dataService.getEarnings(user.userId)
      setEarnings(data)
    } catch (error) {
      console.error('Failed to load earnings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    dataService.clearCache(`earnings_${user.userId}_{}`)
    await loadEarnings()
    setRefreshing(false)
  }

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0)
  const weeklyEarnings = earnings.filter(e => new Date(e.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).reduce((sum, e) => sum + e.amount, 0)
  const avgPerTask = totalEarnings / earnings.length

  const statsCards = [
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      trend: '+12.5%',
      positive: true
    },
    {
      title: 'This Week',
      value: `$${weeklyEarnings.toFixed(2)}`,
      icon: Calendar,
      trend: '+8.3%',
      positive: true
    },
    {
      title: 'Avg per Task',
      value: `$${avgPerTask.toFixed(2)}`,
      icon: Target,
      trend: '+5.1%',
      positive: true
    },
    {
      title: 'Active Platforms',
      value: user.linkedPlatforms.length,
      icon: TrendingUp,
      trend: '+2',
      positive: true
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted/20 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-text mb-2">Dashboard</h2>
          <p className="text-muted">Overview of your micro-earning activities</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-surface text-text px-4 py-2 rounded-lg font-medium hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 shadow-card"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Earning</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-surface rounded-lg p-6 shadow-card card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${stat.positive ? 'text-accent' : 'text-red-500'}`}>
                      {stat.trend}
                    </span>
                    <span className="text-xs text-muted ml-1">vs last period</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Earnings */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-4">Recent Earnings</h3>
        <div className="space-y-3">
          {earnings.slice(0, 5).map((earning) => (
            <EarningCard key={earning.earningId} earning={earning} variant="summary" />
          ))}
        </div>
        <button className="w-full mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
          View All Earnings
        </button>
      </div>
    </div>
  )
}

export default UnifiedDashboard
