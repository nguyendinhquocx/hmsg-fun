import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  try {
    // This function will be called every Monday at 7 AM
    console.log('Running scheduled report...', new Date().toISOString())

    // Call our API endpoint to send the report
    const response = await fetch(`${process.env.URL || 'http://localhost:3000'}/api/send-report`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer scheduled-function',
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const result = await response.json()
      console.log('Report sent successfully:', result)
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Report sent successfully',
          result
        })
      }
    } else {
      const error = await response.text()
      console.error('Failed to send report:', error)
      
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to send report',
          details: error
        })
      }
    }
  } catch (error) {
    console.error('Scheduled function error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal error in scheduled function',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}