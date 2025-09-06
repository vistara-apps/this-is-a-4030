# EarnSmart Hub API Documentation

This document provides comprehensive documentation for the EarnSmart Hub API endpoints and integration patterns.

## 🔗 Base URL

```
Production: https://api.earnsmart-hub.com/v1
Development: http://localhost:3001/api
```

## 🔐 Authentication

All API requests require authentication using Bearer tokens:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

### Authentication Endpoints

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user_123",
    "email": "user@example.com",
    "subscriptionTier": "pro"
  }
}
```

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 👤 User Management

#### GET /user/profile
Get current user profile information.

**Response:**
```json
{
  "userId": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "subscriptionTier": "pro",
  "linkedPlatforms": ["Survey Junkie", "Swagbucks"],
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-15T10:30:00Z"
}
```

#### PUT /user/profile
Update user profile information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "preferences": {
    "currency": "USD",
    "timezone": "America/New_York",
    "notifications": {
      "email": true,
      "push": false
    }
  }
}
```

## 💰 Earnings Management

#### GET /earnings
Retrieve user earnings with optional filtering.

**Query Parameters:**
- `platform` (string): Filter by platform name
- `sourceType` (string): Filter by source type (survey, gig, freelance, etc.)
- `dateFrom` (string): Start date (ISO 8601)
- `dateTo` (string): End date (ISO 8601)
- `limit` (number): Number of results (default: 50)
- `offset` (number): Pagination offset (default: 0)

**Response:**
```json
{
  "earnings": [
    {
      "earningId": "e123",
      "userId": "user_123",
      "platform": "Survey Junkie",
      "task": "Consumer Survey",
      "amount": 15.50,
      "date": "2024-01-15",
      "sourceType": "survey",
      "status": "completed",
      "metadata": {
        "duration": 20,
        "difficulty": "easy"
      }
    }
  ],
  "total": 1,
  "hasMore": false
}
```

#### POST /earnings
Add a new earning record.

**Request Body:**
```json
{
  "platform": "Survey Junkie",
  "task": "Consumer Survey",
  "amount": 15.50,
  "date": "2024-01-15",
  "sourceType": "survey",
  "metadata": {
    "duration": 20,
    "difficulty": "easy"
  }
}
```

#### PUT /earnings/:earningId
Update an existing earning record.

#### DELETE /earnings/:earningId
Delete an earning record.

## 🔍 Opportunities Management

#### GET /opportunities
Get available earning opportunities.

**Query Parameters:**
- `category` (string): Filter by category
- `minPayout` (number): Minimum payout amount
- `maxTimeCommitment` (number): Maximum time in minutes
- `sortBy` (string): Sort by 'rankingScore', 'estimatedProfit', 'timeCommitment'
- `limit` (number): Number of results (default: 20)

**Response:**
```json
{
  "opportunities": [
    {
      "opportunityId": "opp123",
      "platform": "UserTesting",
      "taskDescription": "Test mobile apps and websites",
      "estimatedProfit": 30,
      "timeCommitment": "20-30 minutes",
      "rankingScore": 9.2,
      "category": "testing",
      "trend": "hot",
      "requirements": ["English fluency", "Smartphone"],
      "url": "https://usertesting.com/signup"
    }
  ],
  "total": 1
}
```

#### POST /opportunities/:opportunityId/save
Save an opportunity for later.

#### POST /opportunities/:opportunityId/dismiss
Dismiss an opportunity.

## 🤖 AI Recommendations

#### POST /ai/recommendations
Get AI-powered opportunity recommendations.

**Request Body:**
```json
{
  "preferences": {
    "categories": ["testing", "research"],
    "minPayout": 10,
    "maxTimeCommitment": 60,
    "skillLevel": "intermediate"
  },
  "earningHistory": true,
  "limit": 10
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "opportunityId": "opp123",
      "matchScore": 0.95,
      "reasoning": "High match based on your testing experience and payout preferences",
      "opportunity": {
        "platform": "UserTesting",
        "taskDescription": "Test mobile apps",
        "estimatedProfit": 30,
        "timeCommitment": "20-30 minutes"
      }
    }
  ],
  "insights": {
    "topCategories": ["testing", "research"],
    "avgHourlyRate": 25.50,
    "recommendations": [
      "Focus on testing platforms for higher ROI",
      "Consider research studies for better hourly rates"
    ]
  }
}
```

## 🔗 Platform Integrations

#### GET /platforms
Get list of supported platforms.

**Response:**
```json
{
  "platforms": [
    {
      "id": "survey-junkie",
      "name": "Survey Junkie",
      "category": "surveys",
      "apiSupported": true,
      "avgPayout": 15,
      "difficulty": "easy",
      "timeCommitment": "low",
      "description": "Complete surveys for cash rewards"
    }
  ]
}
```

#### POST /platforms/connect
Connect to a new platform.

**Request Body:**
```json
{
  "platformId": "survey-junkie",
  "credentials": {
    "apiKey": "your_api_key",
    "userId": "your_platform_user_id"
  },
  "syncSettings": {
    "autoSync": true,
    "syncFrequency": "hourly"
  }
}
```

#### DELETE /platforms/:platformId/disconnect
Disconnect from a platform.

#### POST /platforms/:platformId/sync
Manually sync data from a platform.

## 🎁 Reward Management

#### GET /rewards/options
Get available reward redemption options.

**Response:**
```json
{
  "options": [
    {
      "id": "paypal",
      "name": "PayPal Cash",
      "description": "Direct cash transfer",
      "minimumAmount": 5,
      "processingTime": "Instant",
      "fees": "Free",
      "rate": 1.0
    },
    {
      "id": "giftcards",
      "name": "Gift Cards",
      "description": "Amazon, Target, Starbucks",
      "minimumAmount": 5,
      "processingTime": "24 hours",
      "fees": "Free",
      "rate": 1.05,
      "bonus": "+5% bonus value"
    }
  ]
}
```

#### POST /rewards/redeem
Redeem rewards.

**Request Body:**
```json
{
  "redemptionType": "paypal",
  "amount": 50.00,
  "destination": {
    "email": "user@example.com"
  }
}
```

#### GET /rewards/history
Get redemption history.

## ⚙️ Task Automation

#### GET /automations
Get user's automation rules.

**Response:**
```json
{
  "automations": [
    {
      "id": "auto123",
      "name": "Daily Survey Check",
      "description": "Check for high-paying surveys",
      "platform": "Survey Junkie",
      "status": "active",
      "frequency": "daily",
      "rules": {
        "minPayout": 5,
        "categories": ["consumer", "lifestyle"],
        "maxTimeCommitment": 30
      },
      "lastRun": "2024-01-15T09:00:00Z",
      "earnings": 15.50
    }
  ]
}
```

#### POST /automations
Create a new automation rule.

**Request Body:**
```json
{
  "name": "High Value Task Notifier",
  "description": "Notify for tasks over $20",
  "platform": "Multiple",
  "frequency": "real-time",
  "rules": {
    "minPayout": 20,
    "notificationTypes": ["email", "push"]
  }
}
```

#### PUT /automations/:automationId
Update an automation rule.

#### DELETE /automations/:automationId
Delete an automation rule.

#### POST /automations/:automationId/toggle
Enable/disable an automation.

**Request Body:**
```json
{
  "enabled": true
}
```

## 📊 Analytics & Reporting

#### GET /analytics
Get user analytics data.

**Query Parameters:**
- `range` (string): Time range ('7d', '30d', '90d')
- `groupBy` (string): Group by 'day', 'week', 'month'

**Response:**
```json
{
  "totalEarnings": 247.85,
  "avgPerDay": 8.26,
  "avgPerTask": 15.50,
  "taskCount": 16,
  "platformBreakdown": {
    "Survey Junkie": 125.50,
    "UserTesting": 90.00,
    "Swagbucks": 32.35
  },
  "dailyEarnings": [
    {
      "date": "2024-01-15",
      "earnings": 25.50
    }
  ],
  "topPlatform": "Survey Junkie",
  "insights": [
    "Your Survey Junkie tasks have the highest ROI",
    "You earn 23% more on weekdays"
  ]
}
```

#### GET /reports/earnings
Generate detailed earnings report.

**Query Parameters:**
- `format` (string): 'json', 'csv', 'pdf'
- `dateFrom` (string): Start date
- `dateTo` (string): End date
- `groupBy` (string): Group by platform, date, etc.

## 💳 Subscription Management

#### GET /subscription
Get current subscription information.

**Response:**
```json
{
  "tier": "pro",
  "status": "active",
  "currentPeriodStart": "2024-01-01T00:00:00Z",
  "currentPeriodEnd": "2024-02-01T00:00:00Z",
  "cancelAtPeriodEnd": false,
  "features": [
    "advanced_analytics",
    "ai_recommendations",
    "automation_tools"
  ]
}
```

#### POST /subscription/upgrade
Upgrade subscription tier.

**Request Body:**
```json
{
  "planId": "pro_monthly",
  "paymentMethod": "pm_1234567890"
}
```

#### POST /subscription/cancel
Cancel subscription.

## 🚨 Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": {
      "field": "email",
      "issue": "Email format is invalid"
    }
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `INVALID_REQUEST` (400): Request validation failed
- `RATE_LIMITED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## 📈 Rate Limiting

API requests are rate limited per user:

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1,000 requests/hour
- **Premium Tier**: 10,000 requests/hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 🔄 Webhooks

EarnSmart Hub supports webhooks for real-time notifications:

### Supported Events

- `earning.created` - New earning added
- `opportunity.found` - New opportunity discovered
- `automation.completed` - Automation task completed
- `reward.redeemed` - Reward redemption processed

### Webhook Payload Example

```json
{
  "event": "earning.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "earningId": "e123",
    "platform": "Survey Junkie",
    "amount": 15.50,
    "userId": "user_123"
  }
}
```

## 📚 SDK & Libraries

### JavaScript/Node.js
```bash
npm install earnsmart-hub-sdk
```

```javascript
import EarnSmartHub from 'earnsmart-hub-sdk'

const client = new EarnSmartHub({
  apiKey: 'your_api_key',
  environment: 'production'
})

const earnings = await client.earnings.list({
  platform: 'Survey Junkie',
  limit: 10
})
```

### Python
```bash
pip install earnsmart-hub-python
```

```python
from earnsmart_hub import Client

client = Client(api_key='your_api_key')
earnings = client.earnings.list(platform='Survey Junkie', limit=10)
```

## 🧪 Testing

### Test Environment
```
Base URL: https://api-test.earnsmart-hub.com/v1
```

### Test Data
The test environment includes sample data for all endpoints. Use these test credentials:

```
Email: test@earnsmart-hub.com
Password: testpassword123
```

---

For additional support or questions, contact our API team at api-support@earnsmart-hub.com
