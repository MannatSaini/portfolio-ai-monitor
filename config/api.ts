export const API_CONFIG = {
  JIRA_API: {
    BASE_URL: process.env.NEXT_PUBLIC_JIRA_API_URL || 'https://services.elimentary.com/api/jira',
    //BASE_URL: 'http://localhost:6080/api/jira',
    ENDPOINTS: {
      GET_ISSUES_BY_PROJECT: '/getIssuesbyProject'
    },
    HEADERS: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_JIRA_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Origin': 'https://services.elimentary.com',
      'Access-Control-Allow-Origin': 'https://services.elimentary.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Origin',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
} 