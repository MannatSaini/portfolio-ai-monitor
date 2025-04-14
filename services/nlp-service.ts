/**
 * Service for interacting with the NLP API
 */

export interface NLPQueryRequest {
    query: string
  }
  
  export interface NLPQueryResponse {
    results: any[]
    sql?: string
    metadata?: {
      columns?: string[]
      rowCount?: number
      executionTime?: number
    }
    error?: string
  }
  
  export async function queryNLP(query: string): Promise<NLPQueryResponse> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");  
      const response = await fetch("http://localhost:8080/api/nlp/query", {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: JSON.stringify({ query }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
      
        throw new Error(errorData.error || "Failed to query NLP service")
      }
      console.log ("Error data ::::::::::::::",response);
      return await response.json()
    } catch (error) {
      console.error("Error querying NLP service:", error)
      return {
        results: [],
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }