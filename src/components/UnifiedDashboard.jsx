import React from 'react'
import EarningCard from './EarningCard'
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react'

const UnifiedDashboard = ({ user }) => {
  // Mock earning data
  const earnings = [
    {
      earningId: 'e1',
      userId: user.userId,
      platform: 'Survey Junkie',
      task: 'Consumer Survey',
      amount: 15.50,
      date: '2024-01-15',
      sourceType: 'survey'
    },
    {
      earningId: 'e2',
      userId: user.userId,
      platform: 'Swagbucks',
      task: 'Watch Videos',
      amount: 8.25,
      date: '2024-01-14',
      sourceType: 'video'
    },
    {
      earningId: 'e3',
      userId: user.userId,
      platform: 'TaskRabbit',
      task: 'Furniture Assembly',
      amount: 85.00,
      date: '2024-01-13',
      sourceType: 'gig'
    },
    {
      earningId: 'e4',
      userId: user.userId,
      platform: 'Upwork',
      task: 'Data Entry',
      amount: 25.00,
      date: '2024-01-12',
      sourceType: 'freelance'
    },
    {
      earningId: 'e5',
      userId: user.userId,
      platform: 'Amazon MTurk',
      task: 'Content Moderation',
      amount: 12.75,
      date: '2024-01-11',
      sourceType: 'microtask'
    }
  ]

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text mb-2">Dashboard</h2>
        <p className="text-muted">Overview of your micro-earning activities</p>
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