import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { createJiraTicket, getJiraTickets } from "@/lib/jira"
import { getErrorMessage, getErrorAction } from "@/lib/error-mapping"

interface UseCollaborationProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface CreateTicketParams {
  summary: string;
  description: string;
  labels?: string[];
  ticketType?: string;
  priority?: string;
  assignee?: string;
  includeDetails?: boolean;
  status?: string;
}

interface TicketFormData {
  ticketType: string;
  priority: string;
  assignee: string;
  summary: string;
  description: string;
  includeDetails: boolean;
  status: string;
}

interface JiraTicket {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    description: string | null;
    status: {
      id: string;
      name: string;
    };
    priority: {
      id: string;
      name: string;
    };
    issuetype: {
      id: string;
      name: string;
    };
  };
}

interface JiraResponse {
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraTicket[];
}

export function useCollaboration({ onSuccess, onError }: UseCollaborationProps = {}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorAction, setErrorAction] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [tickets, setTickets] = useState<JiraTicket[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(true)
  const [selectedLabels, setSelectedLabels] = useState({
    underwriting: true,
    policy: true,
    "application-review": true,
    urgent: false
  })
  const [ticketFormData, setTicketFormData] = useState<TicketFormData>({
    ticketType: "task",
    priority: "high",
    assignee: "delinquency-team",
    summary: "",
    description: "",
    includeDetails: true,
    status: "open"
  })

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoadingTickets(true);
    setError(null);
    setErrorAction(null);
    
    try {
     
      const result = await getJiraTickets();
     
      
      if (result.success && result.data?.issues) {
     
        setTickets(result.data.issues);
      } else {
        const errorMessage = getErrorMessage(result.error);
        const errorAction = getErrorAction(result.error);
        console.error('Error fetching tickets:', errorMessage, errorAction);
        setError(errorMessage);
        setErrorAction(errorAction || null);
        toast({
          title: "Error",
          description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Exception fetching tickets:', error);
      const errorMessage = getErrorMessage(error);
      const errorAction = getErrorAction(error);
      setError(errorMessage);
      setErrorAction(errorAction || null);
      toast({
        title: "Error",
        description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleCreateTicket = async ({ summary, description, labels, ticketType, priority, assignee, includeDetails, status }: CreateTicketParams) => {
    setLoading(true);
    setError(null);
    setErrorAction(null);
    setSuccess(false);
    try {
      // Get selected labels
      const selectedLabelsList = Object.entries(selectedLabels)
        .filter(([_, isSelected]) => isSelected)
        .map(([label]) => label);

      const finalLabels = labels || selectedLabelsList;

      const result = await createJiraTicket({
        summary,
        description,
        labels: finalLabels,
        issueType: ticketType || ticketFormData.ticketType,
        priority: priority || ticketFormData.priority,
        assignee: assignee || ticketFormData.assignee,
        includeDetails: includeDetails ?? ticketFormData.includeDetails,
        status: status || ticketFormData.status
      });

      if (result.success) {
        setSuccess(true);
        toast({
          title: "Success",
          description: "Jira ticket has been created successfully",
          variant: "default",
        });
        // Refresh tickets after creating a new one
        await fetchTickets();
        onSuccess?.();
      } else {
        const errorMessage = getErrorMessage(result.error);
        const errorAction = getErrorAction(result.error);
        setError(errorMessage);
        setErrorAction(errorAction || null);
        toast({
          title: "Error",
          description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
          variant: "destructive",
        });
        onError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const errorAction = getErrorAction(error);
      setError(errorMessage);
      setErrorAction(errorAction || null);
      toast({
        title: "Error",
        description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const resetState = () => {
    setError(null);
    setErrorAction(null);
    setSuccess(false);
    setLoading(false);
    setTicketFormData({
      ticketType: "task",
      priority: "high",
      assignee: "delinquency-team",
      summary: "",
      description: "",
      includeDetails: true,
      status: "open"
    });
  }

  return {
    loading,
    error,
    errorAction,
    success,
    tickets,
    isLoadingTickets,
    selectedLabels,
    setSelectedLabels,
    ticketFormData,
    setTicketFormData,
    handleCreateTicket,
    resetState,
    fetchTickets
  }
} 