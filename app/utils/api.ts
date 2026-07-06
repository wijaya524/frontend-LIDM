const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Helper function to handle fetch requests safely
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn(`API Error on ${endpoint}:`, errorData.message || response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data as T; // The backend wraps responses in a { status, data } structure
  } catch (error) {
    console.error(`Network or Server error when calling ${endpoint}:`, error);
    return null;
  }
}

export interface UserResponse {
  id: string;
  name: string | null;
  created_at: string;
}

export interface LogResponse {
  log_id: string;
  user_id: string;
  response_time: number;
  wrong_answer_count: number;
  hint_count: number;
  play_time: string;
}

export interface AnalysisResponse {
  analytic_id: string;
  log_id: string;
  pattern_found: string;
  recommendation: string;
  analyzed_at: string;
  response_time: number;
  wrong_answer_count: number;
  hint_count: number;
  play_time: string;
}

/**
 * Register a new user in the database
 */
export async function registerUser(name: string | null): Promise<UserResponse | null> {
  // If name is an empty string, send null to prevent validation failure in backend (name cannot be empty string)
  const trimmedName = name && name.trim().length > 0 ? name.trim() : null;
  
  return fetchAPI<UserResponse>("/users", {
    method: "POST",
    body: JSON.stringify({ name: trimmedName }),
  });
}

/**
 * Update user's name in the database
 */
export async function updateUser(id: string, name: string | null): Promise<UserResponse | null> {
  const trimmedName = name && name.trim().length > 0 ? name.trim() : null;

  return fetchAPI<UserResponse>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name: trimmedName }),
  });
}

/**
 * Save a game play log session
 */
export async function saveGameLog(
  userId: string,
  responseTime: number,
  wrongAnswerCount: number,
  hintCount: number
): Promise<{ log: LogResponse; analysis: AnalysisResponse } | null> {
  return fetchAPI<{ log: LogResponse; analysis: AnalysisResponse }>("/logs", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      response_time: Math.round(responseTime),
      wrong_answer_count: wrongAnswerCount,
      hint_count: hintCount,
    }),
  });
}

/**
 * Fetch all analytical results and logs for a specific user
 */
export async function getUserAnalytics(userId: string): Promise<AnalysisResponse[] | null> {
  return fetchAPI<AnalysisResponse[]>(`/analytics/user/${userId}`);
}
