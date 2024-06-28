import axios from 'axios';
import { showError, errorMessages } from './messages';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

export const fetchMembers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/members`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchMembers);
    throw error;
  }
};
