import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Calendar, Target, DollarSign, Clock } from 'lucide-react'
import dataService from '../services/dataService'

const Analytics = ({ user }) => {
  const [analytics, setAnalytics] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [timeRange, user.userId])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const data = await dataService.getAnalytics(user.userId, timeRange)
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasAdvancedAccess = dataService.hasFeatureAccess(user.subscriptionTier, 'advanced_analytics')

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted/20 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-muted mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text mb-2">No Analytics Data</h3>
        <p className="text-muted">Start earning to see your analytics</p>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Earnings',
      value: `$${analytics.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      trend: '+12.5%',
      positive: true
    },
    {
      title: 'Daily Average',
      value: `$${analytics.avgPerDay.toFixed(2)}`,
      icon: Calendar,
      trend: '+8.3%',
      positive: true
    },
    {
      title: 'Per Task Average',
      value: `$${analytics.avgPerTask.toFixed(2)}`,
      icon: Target,
      trend: '+5.1%',
      positive: true
    },
    {
      title: 'Tasks Completed',
      value: analytics.taskCount,
      icon: Clock,
      trend: '+15',
      positive: true
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-text mb-2">Analytics</h2>
          <p className="text-muted">Insights into your earning performance</p>
        </div>
        
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-surface text-muted hover:text-text hover:bg-muted/10'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Earnings Chart */}
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-xl font-semibold text-text mb-4">Daily Earnings</h3>
          <div className="h-64 flex items-end space-x-2">
            {analytics.dailyEarnings.slice(-14).map((day, index) => {
              const maxEarnings = Math.max(...analytics.dailyEarnings.map(d => d.earnings))
              const height = maxEarnings > 0 ? (day.earnings / maxEarnings) * 100 : 0
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${day.date}: $${day.earnings.toFixed(2)}`}
                  ></div>
                  <span className="text-xs text-muted mt-2 transform rotate-45 origin-left">
                    {new Date(day.date).getDate()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-xl font-semibold text-text mb-4">Platform Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(analytics.platformBreakdown)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([platform, earnings]) => {
                const percentage = (earnings / analytics.totalEarnings) * 100
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-text">{platform}</span>
                      <span className="text-sm text-muted">${earnings.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Advanced Analytics (Pro/Premium only) */}
      {hasAdvancedAccess ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Insights */}
          <div className="bg-surface rounded-lg p-6 shadow-card">
            <h3 className="text-xl font-semibold text-text mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                <div>
                  <p className="font-medium text-text">Best Performing Platform</p>
                  <p className="text-sm text-muted">{analytics.topPlatform}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/10 rounded-lg">
                  <p className="text-2xl font-bold text-text">{analytics.taskCount}</p>
                  <p className="text-sm text-muted">Tasks This Period</p>
                </div>
                <div className="text-center p-4 bg-muted/10 rounded-lg">
                  <p className="text-2xl font-bold text-text">
                    {(analytics.totalEarnings / analytics.taskCount * 60 / 30).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted">$/Hour (Est.)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-surface rounded-lg p-6 shadow-card">
            <h3 className="text-xl font-semibold text-text mb-4">AI Recommendations</h3>
            <div className="space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-medium text-text mb-1">Focus on High-Value Tasks</p>
                <p className="text-sm text-muted">
                  Your {analytics.topPlatform} tasks have the highest ROI. Consider spending more time there.
                </p>
              </div>
              
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="font-medium text-text mb-1">Optimize Your Schedule</p>
                <p className="text-sm text-muted">
                  You earn 23% more on weekdays. Try scheduling more tasks during business hours.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-100 rounded-lg">
                <p className="font-medium text-text mb-1">Diversify Platforms</p>
                <p className="text-sm text-muted">
                  Adding 2-3 more platforms could increase your monthly earnings by 15-20%.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Unlock Advanced Analytics</h3>
              <p className="text-white/90 mb-4">
                Get detailed insights, AI recommendations, and performance optimization tips.
              </p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Upgrade to Pro
              </button>
            </div>
            <BarChart3 className="w-16 h-16 text-white/50" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Analytics
