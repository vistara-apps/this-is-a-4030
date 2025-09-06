import React, { useState, useEffect } from 'react'
import OpportunityCard from './OpportunityCard'
import { Search, Filter, Sparkles, TrendingUp, RefreshCw } from 'lucide-react'
import dataService from '../services/dataService'

const OpportunityScout = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadOpportunities()
  }, [user.userId])

  const loadOpportunities = async () => {
    setLoading(true)
    try {
      const data = await dataService.getOpportunities(user.userId)
      setOpportunities(data)
    } catch (error) {
      console.error('Failed to load opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    dataService.clearCache(`opportunities_${user.userId}_{}`)
    await loadOpportunities()
    setRefreshing(false)
  }



  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.taskDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterBy === 'all' || opp.category === filterBy
    return matchesSearch && matchesFilter
  })

  const hasAIAccess = dataService.hasFeatureAccess(user.subscriptionTier, 'ai_recommendations')

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted/20 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted/20 rounded-lg"></div>
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
          <h2 className="text-3xl font-bold text-text mb-2">Opportunity Scout</h2>
          <p className="text-muted">Discover new ways to earn money online</p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-surface text-text px-4 py-2 rounded-lg font-medium hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 shadow-card"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* AI-Powered Insights */}
      {hasAIAccess ? (
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">AI-Powered Recommendations</h3>
          </div>
          <p className="text-white/90 mb-4">
            Based on your earning history, we found {filteredOpportunities.length} new opportunities that match your profile.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">High-paying research</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Quick tasks</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Tech-focused</span>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Unlock AI Recommendations</h3>
              <p className="text-white/90 mb-4">
                Get personalized opportunity suggestions based on your earning patterns.
              </p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Upgrade to Pro
              </button>
            </div>
            <Sparkles className="w-16 h-16 text-white/50" />
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="pl-10 pr-8 py-3 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-surface"
          >
            <option value="all">All Categories</option>
            <option value="research">Research</option>
            <option value="testing">Testing</option>
            <option value="microtask">Micro Tasks</option>
          </select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.opportunityId} opportunity={opportunity} variant="recommended" />
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">No opportunities found</h3>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default OpportunityScout
