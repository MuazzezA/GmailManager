import axios from 'axios';
import {getUserSession} from '../store/logic.ts';

const userAuthValidation = async () => {
  try {
    const data = await getUserSession();
    if (!data) {
      return {isValid: false};
    }
    const accessToken = JSON.parse(data).token;
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
    );
    console.log('Token information:', response.data);
    return {isValid: true, data: response.data};
  } catch (error) {
    console.error('Error validating token:', error);
    return {isValid: false, error: error};
  }
};

export default userAuthValidation;
