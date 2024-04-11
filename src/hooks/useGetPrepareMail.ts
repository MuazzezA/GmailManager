import {useEffect, useRef, useState} from 'react';
import {getUserSession} from '../store/storage.ts';
import {getMail} from '../helpers/getUserMail.ts';

export const useGetPrepareMail = () => {
  const [mailIDList, setMailIDList] = useState([]);
  const mailListRef = useRef(false);
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mailIDList?.length > 0 || mailListRef.current || loading) {
      return;
    }
    setLoading(true);
    mailListRef.current = true;

    getUserSession()
      .then(res => {
        //@ts-ignore
        setSession(res);
      })
      .catch(() => {});

    getMail()
      .then(res => {
        // todo : control
        setMailIDList(res?.messages);
      })
      .catch(() => {});

    setLoading(false);
  }, [loading, mailIDList]);

  return {mailIDList, mailListRef, session, loading};
};
