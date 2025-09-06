import React, { useState } from 'react'
import OpportunityCard from './OpportunityCard'
import { Search, Filter, Sparkles, TrendingUp } from 'lucide-react'

const OpportunityScout = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')

  // Mock opportunity data
  const opportunities = [
    {
      opportunityId: 'opp1',
      userId: user.userId,
      platform: 'UserTesting',
      taskDescription: 'Test mobile apps and websites for usability issues',
      estimatedProfit: 30,
      timeCommitment: '20-30 minutes',
      rankingScore: 9.2,
      url: 'https://usertesting.com',
      category: 'testing',
      trend: 'hot'
    },
    {
      opportunityId: 'opp2',
      userId: user.userId,
      platform: 'Respondent',
      taskDescription: 'Participate in high-paying research studies',
      estimatedProfit: 150,
      timeCommitment: '1-2 hours',
      rankingScore: 8.8,
      url: 'https://respondent.io',
      category: 'research',
      trend: 'trending'
    },
    {
      opportunityId: 'opp3',
      userId: user.userId,
      platform: 'Clickworker',
      taskDescription: 'AI training data creation and validation',
      estimatedProfit: 12,
      timeCommitment: '10-15 minutes',
      rankingScore: 7.5,
      url: 'https://clickworker.com',
      category: 'microtask',
      trend: 'new'
    },
    {
      opportunityId: 'opp4',
      userId: user.userId,
      platform: 'Prolific',
      taskDescription: 'Academic research participation',
      estimatedProfit: 25,
      timeCommitment: '30-45 minutes',
      rankingScore: 8.3,
      url: 'https://prolific.co',
      category: 'research',
      trend: 'stable'
    }
  ]

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.taskDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterBy === 'all' || opp.category === filterBy
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text mb-2">Opportunity Scout</h2>
        <p className="text-muted">Discover new ways to earn money online</p>
      </div>

      {/* AI-Powered Insights */}
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