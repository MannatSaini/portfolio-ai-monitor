interface JiraTicketFields {
  project: {
    key: string;
  };
  summary: string;
  description: string;
  issuetype: {
    name: string;
  };
  assignee: {
    name: string;
  };
  labels: string[];
}

interface CreateJiraTicketParams {
  summary: string;
  description: string;
  issueType?: string;
  assignee?: string;
  labels?: string[];
  projectKey?: string;
}

export async function createJiraTicket({
  summary,
  description,
  issueType = "Task",
  assignee = "",
  labels = ["Underwriting", "Policy"],
  projectKey = "MAQ"
}: CreateJiraTicketParams): Promise<{ success: boolean; error?: string }> {
  try {
   // const jiraApiUrl = process.env.COLLABORATION_SERVICE_URL || "/api/jira/createIssue";
   const jiraApiUrl  ="http://localhost:8080/api/jira/createIssue"

    const requestBody = {
      fields: {
      project: {
        key: projectKey,
      },
      summary,
      description,
      issuetype: {
        name: issueType,
      },
      assignee: {
        name: assignee,
      },
      },
    };

    // Assuming `dynamicRequestBody` is passed from the UI page
    const finalRequestBody = { ...requestBody };

    const response = await fetch(jiraApiUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(finalRequestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to create JIRA ticket: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating JIRA ticket:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create JIRA ticket",
    };
  }
} 