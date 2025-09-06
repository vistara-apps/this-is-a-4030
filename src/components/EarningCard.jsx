import React from 'react'
import { ExternalLink, Calendar, DollarSign } from 'lucide-react'

const EarningCard = ({ earning, variant = 'summary' }) => {
  const getPlatformColor = (platform) => {
    const colors = {
      'Survey Junkie': 'bg-blue-100 text-blue-800',
      'Swagbucks': 'bg-green-100 text-green-800',
      'TaskRabbit': 'bg-orange-100 text-orange-800',
      'Upwork': 'bg-purple-100 text-purple-800',
      'Amazon MTurk': 'bg-yellow-100 text-yellow-800'
    }
    return colors[platform] || 'bg-gray-100 text-gray-800'
  }

  if (variant === 'summary') {
    return (
      <div className="flex items-center justify-between p-4 border border-muted/20 rounded-lg hover:bg-muted/5 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-text">{earning.task}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPlatformColor(earning.platform)}`}>
                {earning.platform}
              </span>
              <span className="text-xs text-muted">{new Date(earning.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-accent">${earning.amount.toFixed(2)}</p>
          <p className="text-xs text-muted capitalize">{earning.sourceType}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text">{earning.task}</h3>
          <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium mt-2 ${getPlatformColor(earning.platform)}`}>
            {earning.platform}
          </span>
        </div>
        <button className="p-2 hover:bg-muted/10 rounded-lg transition-colors">
          <ExternalLink className="w-4 h-4 text-muted" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-muted">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{new Date(earning.date).toLocaleDateString()}</span>
        </div>
        <p className="font-bold text-xl text-accent">${earning.amount.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default EarningCard