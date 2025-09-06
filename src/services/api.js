/**
 * API Service Layer for EarnSmart Hub
 * Handles all external API communications and data management
 */

// Mock API base URL - replace with actual backend URL
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('authToken')
  }

  // Generic request method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    if (response.token) {
      this.token = response.token
      localStorage.setItem('authToken', response.token)
    }
    
    return response
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    localStorage.removeItem('authToken')
    this.token = null
  }

  // User management
  async getUserProfile() {
    return this.request('/user/profile')
  }

  async updateUserProfile(userData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  // Earnings management
  async getEarnings(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    return this.request(`/earnings${queryParams ? `?${queryParams}` : ''}`)
  }

  async addEarning(earningData) {
    return this.request('/earnings', {
      method: 'POST',
      body: JSON.stringify(earningData),
    })
  }

  async updateEarning(earningId, earningData) {
    return this.request(`/earnings/${earningId}`, {
      method: 'PUT',
      body: JSON.stringify(earningData),
    })
  }

  async deleteEarning(earningId) {
    return this.request(`/earnings/${earningId}`, {
      method: 'DELETE',
    })
  }

  // Opportunities management
  async getOpportunities(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    return this.request(`/opportunities${queryParams ? `?${queryParams}` : ''}`)
  }

  async saveOpportunity(opportunityId) {
    return this.request(`/opportunities/${opportunityId}/save`, {
      method: 'POST',
    })
  }

  async dismissOpportunity(opportunityId) {
    return this.request(`/opportunities/${opportunityId}/dismiss`, {
      method: 'POST',
    })
  }

  // AI-powered opportunity scouting
  async getAIRecommendations(userPreferences = {}) {
    return this.request('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify(userPreferences),
    })
  }

  // Platform integrations
  async connectPlatform(platformData) {
    return this.request('/platforms/connect', {
      method: 'POST',
      body: JSON.stringify(platformData),
    })
  }

  async disconnectPlatform(platformId) {
    return this.request(`/platforms/${platformId}/disconnect`, {
      method: 'DELETE',
    })
  }

  async syncPlatformData(platformId) {
    return this.request(`/platforms/${platformId}/sync`, {
      method: 'POST',
    })
  }

  // Reward redemptions
  async getRedemptionOptions() {
    return this.request('/rewards/options')
  }

  async redeemReward(redemptionData) {
    return this.request('/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify(redemptionData),
    })
  }

  async getRedemptionHistory() {
    return this.request('/rewards/history')
  }

  // Task automation
  async getAutomations() {
    return this.request('/automations')
  }

  async createAutomation(automationData) {
    return this.request('/automations', {
      method: 'POST',
      body: JSON.stringify(automationData),
    })
  }

  async updateAutomation(automationId, automationData) {
    return this.request(`/automations/${automationId}`, {
      method: 'PUT',
      body: JSON.stringify(automationData),
    })
  }

  async deleteAutomation(automationId) {
    return this.request(`/automations/${automationId}`, {
      method: 'DELETE',
    })
  }

  async toggleAutomation(automationId, enabled) {
    return this.request(`/automations/${automationId}/toggle`, {
      method: 'POST',
      body: JSON.stringify({ enabled }),
    })
  }

  // Subscription management
  async getSubscriptionInfo() {
    return this.request('/subscription')
  }

  async upgradeSubscription(planId) {
    return this.request('/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    })
  }

  async cancelSubscription() {
    return this.request('/subscription/cancel', {
      method: 'POST',
    })
  }

  // Analytics and reporting
  async getAnalytics(timeRange = '30d') {
    return this.request(`/analytics?range=${timeRange}`)
  }

  async getEarningsReport(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    return this.request(`/reports/earnings${queryParams ? `?${queryParams}` : ''}`)
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
