import axios from 'axios';
import {getUserSession} from '../store/logic.ts';
import {useEffect, useState} from 'react';

export const useAuthValidation = () => {
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);

  const verifyUser = async () => {
    try {
      setLoading(true);
      const data = await getUserSession();
      if (data) {
        const accessToken = JSON.parse(data).token;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
        );
        console.log('Token information:', response.data);
        setLoading(false);
        setValidate(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error('Error validating token:', error);
      setLoading(false);
      // throw error;
    }
  };

  useEffect(() => {
    verifyUser().then();
  }, []);

  return {validate, loading};
};
