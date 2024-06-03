import {MailType} from '../types/MailType.ts';
import React from 'react';
import {getMailItem} from './getUserMail.ts';

export const getMails = async ({
  setLoading,
  pagination,
  mailIDList,
  mails,
  setMails,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pagination: {start: number; end: number};
  mailIDList: {id: string}[];
  mails: MailType[];
  setMails: React.Dispatch<React.SetStateAction<MailType[]>>;
}) => {
  try {
    for (
      let i = pagination.start;
      i < Math.min(pagination.end, mailIDList.length);
      i++
    ) {
      const item = mailIDList[i];

      if (
        !mails
          .filter(m => !!m.id)
          .find(mail => mail.id.toString() === item.id.toString())
      ) {
        try {
          const response = await getMailItem(item.id);
          setMails(prevData => [...prevData, response]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }

    //setMails(prevData => [...prevData, ...newMails]);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
