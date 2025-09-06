/**
 * Data Service for EarnSmart Hub
 * Handles data management, caching, and mock data for development
 */

import apiService from './api.js'

class DataService {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5 minutes
  }

  // Cache management
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  getCache(key) {
    const cached = this.cache.get(key)
    if (!cached) return null
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data
  }

  clearCache(key = null) {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  // Mock data generators for development
  generateMockEarnings(userId, count = 20) {
    const platforms = ['Survey Junkie', 'Swagbucks', 'TaskRabbit', 'Upwork', 'Amazon MTurk', 'UserTesting', 'Clickworker']
    const tasks = [
      'Consumer Survey', 'Watch Videos', 'Furniture Assembly', 'Data Entry', 'Content Moderation',
      'Website Testing', 'Product Review', 'Transcription', 'Image Tagging', 'Research Study'
    ]
    const sourceTypes = ['survey', 'video', 'gig', 'freelance', 'microtask', 'testing']
    
    return Array.from({ length: count }, (_, i) => ({
      earningId: `e${i + 1}`,
      userId,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)],
      amount: parseFloat((Math.random() * 100 + 5).toFixed(2)),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sourceType: sourceTypes[Math.floor(Math.random() * sourceTypes.length)]
    }))
  }

  generateMockOpportunities(userId, count = 15) {
    const opportunities = [
      {
        platform: 'UserTesting',
        taskDescription: 'Test mobile apps and websites for usability issues',
        estimatedProfit: 30,
        timeCommitment: '20-30 minutes',
        category: 'testing',
        trend: 'hot'
      },
      {
        platform: 'Respondent',
        taskDescription: 'Participate in high-paying research studies',
        estimatedProfit: 150,
        timeCommitment: '1-2 hours',
        category: 'research',
        trend: 'trending'
      },
      {
        platform: 'Prolific',
        taskDescription: 'Academic research participation',
        estimatedProfit: 25,
        timeCommitment: '30-45 minutes',
        category: 'research',
        trend: 'stable'
      },
      {
        platform: 'Clickworker',
        taskDescription: 'AI training data creation and validation',
        estimatedProfit: 12,
        timeCommitment: '10-15 minutes',
        category: 'microtask',
        trend: 'new'
      },
      {
        platform: 'Appen',
        taskDescription: 'Language data collection and annotation',
        estimatedProfit: 18,
        timeCommitment: '25-35 minutes',
        category: 'microtask',
        trend: 'stable'
      },
      {
        platform: 'Lionbridge',
        taskDescription: 'Search engine evaluation tasks',
        estimatedProfit: 22,
        timeCommitment: '30-40 minutes',
        category: 'evaluation',
        trend: 'trending'
      }
    ]

    return opportunities.slice(0, count).map((opp, i) => ({
      opportunityId: `opp${i + 1}`,
      userId,
      ...opp,
      rankingScore: parseFloat((Math.random() * 3 + 7).toFixed(1)),
      url: `https://${opp.platform.toLowerCase().replace(' ', '')}.com`
    }))
  }

  generateMockAutomations(userId) {
    return [
      {
        id: 'auto1',
        name: 'Daily Survey Check',
        description: 'Automatically checks for new high-paying surveys every morning',
        platform: 'Survey Junkie',
        status: 'active',
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        earnings: 15.50,
        frequency: 'Daily at 9:00 AM',
        rules: {
          minPayout: 5,
          categories: ['consumer', 'lifestyle'],
          maxTimeCommitment: 30
        }
      },
      {
        id: 'auto2',
        name: 'Video Reward Collector',
        description: 'Watches video ads and collects rewards during idle time',
        platform: 'Swagbucks',
        status: 'paused',
        lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        earnings: 8.25,
        frequency: 'Every 2 hours',
        rules: {
          idleTimeRequired: 120,
          maxDailyVideos: 50
        }
      },
      {
        id: 'auto3',
        name: 'Task Notifier',
        description: 'Sends notifications for high-value tasks that match your skills',
        platform: 'Multiple',
        status: 'active',
        lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        earnings: 0,
        frequency: 'Real-time',
        rules: {
          minPayout: 20,
          skills: ['data-entry', 'research', 'testing'],
          notificationTypes: ['email', 'push']
        }
      }
    ]
  }

  // Data fetching methods with caching
  async getEarnings(userId, filters = {}) {
    const cacheKey = `earnings_${userId}_${JSON.stringify(filters)}`
    const cached = this.getCache(cacheKey)
    
    if (cached) {
      return cached
    }

    try {
      // Try to fetch from API first
      const data = await apiService.getEarnings(filters)
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Fallback to mock data
      const mockData = this.generateMockEarnings(userId, 20)
      this.setCache(cacheKey, mockData)
      return mockData
    }
  }

  async getOpportunities(userId, filters = {}) {
    const cacheKey = `opportunities_${userId}_${JSON.stringify(filters)}`
    const cached = this.getCache(cacheKey)
    
    if (cached) {
      return cached
    }

    try {
      const data = await apiService.getOpportunities(filters)
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      const mockData = this.generateMockOpportunities(userId, 15)
      this.setCache(cacheKey, mockData)
      return mockData
    }
  }

  async getAutomations(userId) {
    const cacheKey = `automations_${userId}`
    const cached = this.getCache(cacheKey)
    
    if (cached) {
      return cached
    }

    try {
      const data = await apiService.getAutomations()
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      const mockData = this.generateMockAutomations(userId)
      this.setCache(cacheKey, mockData)
      return mockData
    }
  }

  async getAnalytics(userId, timeRange = '30d') {
    const cacheKey = `analytics_${userId}_${timeRange}`
    const cached = this.getCache(cacheKey)
    
    if (cached) {
      return cached
    }

    try {
      const data = await apiService.getAnalytics(timeRange)
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.warn('API unavailable, generating mock analytics:', error.message)
      const earnings = await this.getEarnings(userId)
      const mockAnalytics = this.generateAnalytics(earnings, timeRange)
      this.setCache(cacheKey, mockAnalytics)
      return mockAnalytics
    }
  }

  generateAnalytics(earnings, timeRange) {
    const now = new Date()
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    
    const filteredEarnings = earnings.filter(e => new Date(e.date) >= startDate)
    
    const totalEarnings = filteredEarnings.reduce((sum, e) => sum + e.amount, 0)
    const avgPerDay = totalEarnings / days
    const avgPerTask = filteredEarnings.length > 0 ? totalEarnings / filteredEarnings.length : 0
    
    // Platform breakdown
    const platformBreakdown = filteredEarnings.reduce((acc, e) => {
      acc[e.platform] = (acc[e.platform] || 0) + e.amount
      return acc
    }, {})
    
    // Daily earnings for chart
    const dailyEarnings = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      const dayEarnings = filteredEarnings
        .filter(e => e.date === dateStr)
        .reduce((sum, e) => sum + e.amount, 0)
      
      dailyEarnings.push({
        date: dateStr,
        earnings: dayEarnings
      })
    }
    
    return {
      totalEarnings,
      avgPerDay,
      avgPerTask,
      taskCount: filteredEarnings.length,
      platformBreakdown,
      dailyEarnings,
      topPlatform: Object.keys(platformBreakdown).reduce((a, b) => 
        platformBreakdown[a] > platformBreakdown[b] ? a : b, Object.keys(platformBreakdown)[0]
      )
    }
  }

  // Subscription tier checking
  hasFeatureAccess(userTier, feature) {
    const featureMap = {
      'basic_analytics': ['free', 'pro', 'premium'],
      'advanced_analytics': ['pro', 'premium'],
      'ai_recommendations': ['pro', 'premium'],
      'automation_tools': ['pro', 'premium'],
      'priority_support': ['premium'],
      'early_access': ['premium'],
      'unlimited_platforms': ['pro', 'premium'],
      'custom_automations': ['premium']
    }
    
    return featureMap[feature]?.includes(userTier) || false
  }

  // Platform integration helpers
  getSupportedPlatforms() {
    return [
      {
        id: 'survey-junkie',
        name: 'Survey Junkie',
        category: 'surveys',
        avgPayout: 15,
        difficulty: 'easy',
        timeCommitment: 'low',
        apiSupported: true
      },
      {
        id: 'swagbucks',
        name: 'Swagbucks',
        category: 'mixed',
        avgPayout: 10,
        difficulty: 'easy',
        timeCommitment: 'low',
        apiSupported: true
      },
      {
        id: 'taskrabbit',
        name: 'TaskRabbit',
        category: 'gigs',
        avgPayout: 50,
        difficulty: 'medium',
        timeCommitment: 'high',
        apiSupported: false
      },
      {
        id: 'upwork',
        name: 'Upwork',
        category: 'freelance',
        avgPayout: 75,
        difficulty: 'high',
        timeCommitment: 'high',
        apiSupported: true
      },
      {
        id: 'usertesting',
        name: 'UserTesting',
        category: 'testing',
        avgPayout: 30,
        difficulty: 'medium',
        timeCommitment: 'medium',
        apiSupported: true
      }
    ]
  }
}

// Create and export singleton instance
const dataService = new DataService()
export default dataService
