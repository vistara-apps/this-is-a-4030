import React from 'react'
import { ExternalLink, Clock, DollarSign, Star, TrendingUp, Flame, Sparkles } from 'lucide-react'

const OpportunityCard = ({ opportunity, variant = 'listed' }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'hot':
        return <Flame className="w-4 h-4 text-red-500" />
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'new':
        return <Sparkles className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'hot':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'trending':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card card-hover border border-muted/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text text-lg">{opportunity.platform}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-text">{opportunity.rankingScore}</span>
            </div>
            {opportunity.trend !== 'stable' && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getTrendColor(opportunity.trend)}`}>
                {getTrendIcon(opportunity.trend)}
                <span className="capitalize">{opportunity.trend}</span>
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => window.open(opportunity.url, '_blank')}
          className="p-2 hover:bg-muted/10 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-muted" />
        </button>
      </div>

      {/* Description */}
      <p className="text-muted text-sm mb-4 line-clamp-2">{opportunity.taskDescription}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-accent" />
          <div>
            <p className="text-xs text-muted">Est. Profit</p>
            <p className="font-semibold text-text">${opportunity.estimatedProfit}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted">Time</p>
            <p className="font-semibold text-text">{opportunity.timeCommitment}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => window.open(opportunity.url, '_blank')}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors"
      >
        Explore Opportunity
      </button>
    </div>
  )
}

export default OpportunityCard