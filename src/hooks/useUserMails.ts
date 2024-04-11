import {useEffect, useState} from 'react';
import {getMailItem} from '../helpers/getUserMail.ts';
import {MailType} from '../types/MailType.ts';
import {Alert} from 'react-native';

export const useUserMails = (props: {
  mailIDList: {id: string}[];
  session: unknown;
  loadingIDList: boolean;
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
      try {
        const newMails: MailType[] = [];

        for (
          let i = pagination.start;
          i < Math.min(pagination.end, mailIDList.length);
          i++
        ) {
          const item = mailIDList[i];
          if (!item) {
            continue;
          }
          if (
            !mails
              .filter(m => !!m.id)
              .find(mail => mail.id.toString() === item.id.toString())
          ) {
            try {
              const response = await getMailItem(item.id);
              newMails.push(response);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        }

        setMails(prevData => [...prevData, ...newMails]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Have Some Problem');
      }
    };

    fetchData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.end, pagination.start, mailIDList, loadingIDList, loading]);

  return {mails, pagination, setPagination, loading};
};
