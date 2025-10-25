import axiosConfig from "../utils/axiosConfig.ts";

export interface Feedback {
  id: number;
  user_id?: number | null;
  user_name: string;
  user_avatar?: string | null;
  rating: number;
  comment: string;
  created_at: string;
}

export interface SubmitFeedbackData {
  user_id?: number | null;
  user_name: string;
  user_avatar?: string | null;
  rating: number;
  comment: string;
}

export const feedbackApi = {
  getAllFeedback: async (): Promise<Feedback[]> => {
    const response = await axiosConfig.get('/api/feedback');
    return response.data;
  },

  submitFeedback: async (feedbackData: SubmitFeedbackData): Promise<{ message: string; id: number }> => {
    const response = await axiosConfig.post('/api/feedback', feedbackData);
    return response.data;
  }
};