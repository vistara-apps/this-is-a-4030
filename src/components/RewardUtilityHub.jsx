import React, { useState } from 'react'
import { Gift, CreditCard, Coins, ArrowRight, Zap } from 'lucide-react'

const RewardUtilityHub = ({ user }) => {
  const [selectedRedemption, setSelectedRedemption] = useState(null)

  // Mock reward data
  const totalRewards = 247.85
  const pendingRewards = 32.50

  const redemptionOptions = [
    {
      id: 'paypal',
      name: 'PayPal Cash',
      description: 'Direct cash transfer to your PayPal account',
      icon: CreditCard,
      minimumAmount: 5,
      processingTime: 'Instant',
      fees: 'Free',
      rate: 1.0
    },
    {
      id: 'giftcards',
      name: 'Gift Cards',
      description: 'Amazon, Target, Starbucks and more',
      icon: Gift,
      minimumAmount: 5,
      processingTime: '24 hours',
      fees: 'Free',
      rate: 1.05,
      bonus: '+5% bonus value'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, or USDC',
      icon: Coins,
      minimumAmount: 10,
      processingTime: '1-3 hours',
      fees: 'Network fees apply',
      rate: 1.0
    },
    {
      id: 'investment',
      name: 'Investment Account',
      description: 'Direct deposit to brokerage account',
      icon: Zap,
      minimumAmount: 25,
      processingTime: '1-2 business days',
      fees: 'Free',
      rate: 1.0,
      tag: 'Pro Feature'
    }
  ]

  const recentRedemptions = [
    {
      id: 'r1',
      method: 'PayPal Cash',
      amount: 50.00,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 'r2',
      method: 'Amazon Gift Card',
      amount: 25.00,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 'r3',
      method: 'Bitcoin',
      amount: 75.00,
      date: '2024-01-08',
      status: 'pending'
    }
  ]

  const getStatusColor = (status) => {
    return status === 'completed' ? 'text-accent' : 'text-yellow-600'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text mb-2">Reward Utility Hub</h2>
        <p className="text-muted">Maximize the value of your earned rewards</p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Available Balance</p>
              <p className="text-2xl font-bold text-text">${totalRewards.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending Rewards</p>
              <p className="text-2xl font-bold text-text">${pendingRewards.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Redeemed</p>
              <p className="text-2xl font-bold text-text">$1,234.56</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Options */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-4">Redemption Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {redemptionOptions.map((option) => {
            const Icon = option.icon
            const isAvailable = totalRewards >= option.minimumAmount
            const isPro = option.tag === 'Pro Feature' && user.subscriptionTier === 'free'
            
            return (
              <div
                key={option.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedRedemption === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-muted/20 hover:border-muted/40'
                } ${!isAvailable || isPro ? 'opacity-50' : ''}`}
                onClick={() => isAvailable && !isPro && setSelectedRedemption(option.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-text">{option.name}</h4>
                      {option.bonus && (
                        <span className="text-xs text-accent font-medium">{option.bonus}</span>
                      )}
                      {option.tag && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2">{option.tag}</span>
                      )}
                    </div>
                  </div>
                  {selectedRedemption === option.id && (
                    <ArrowRight className="w-5 h-5 text-primary" />
                  )}
                </div>
                
                <p className="text-sm text-muted mb-3">{option.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted">Min: </span>
                    <span className="text-text">${option.minimumAmount}</span>
                  </div>
                  <div>
                    <span className="text-muted">Time: </span>
                    <span className="text-text">{option.processingTime}</span>
                  </div>
                  <div>
                    <span className="text-muted">Fees: </span>
                    <span className="text-text">{option.fees}</span>
                  </div>
                  <div>
                    <span className="text-muted">Rate: </span>
                    <span className="text-text">{option.rate}x</span>
                  </div>
                </div>
                
                {!isAvailable && (
                  <p className="text-xs text-red-500 mt-2">
                    Minimum ${option.minimumAmount} required
                  </p>
                )}
                {isPro && (
                  <p className="text-xs text-primary mt-2">
                    Upgrade to Pro to unlock this feature
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {selectedRedemption && (
          <div className="mt-6 p-4 bg-muted/5 rounded-lg">
            <h4 className="font-semibold text-text mb-2">Ready to redeem?</h4>
            <div className="flex items-center justify-between">
              <span className="text-muted">You can redeem up to ${totalRewards.toFixed(2)}</span>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Continue Redemption
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Redemptions */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-4">Recent Redemptions</h3>
        <div className="space-y-3">
          {recentRedemptions.map((redemption) => (
            <div key={redemption.id} className="flex items-center justify-between p-3 border border-muted/20 rounded-lg">
              <div>
                <p className="font-medium text-text">{redemption.method}</p>
                <p className="text-sm text-muted">{new Date(redemption.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text">${redemption.amount.toFixed(2)}</p>
                <p className={`text-sm capitalize ${getStatusColor(redemption.status)}`}>
                  {redemption.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RewardUtilityHub