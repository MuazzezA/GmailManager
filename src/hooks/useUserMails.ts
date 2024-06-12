import {useEffect, useState} from 'react';
import {MailType} from '../types/MailType.ts';
import {getMails} from '../helpers/getMails.ts';

export const useUserMails = (props: {
  mailIDList: {id: string}[] | undefined;
  session: unknown;
  loadingIDList?: boolean;
}) => {
  const {mailIDList, loadingIDList} = props;
  const [mails, setMails] = useState<MailType[]>([]);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 20,
  });

  useEffect(() => {
    if (loadingIDList || loading || mails.length > pagination.end) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      if (mailIDList) {
        await getMails({
          setLoading,
          pagination,
          mailIDList,
          setMails,
          mails,
        });
      }
    };

    fetchData()
      .then()
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.end, pagination.start, mailIDList, loadingIDList, loading]);

  return {mails, pagination, setPagination, loading};
};
