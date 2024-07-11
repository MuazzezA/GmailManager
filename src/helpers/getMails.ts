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
    const newMails = mails.filter(mail =>
      mailIDList.some(item => item.id.toString() === mail.id.toString()),
    );

    for (
      let i = pagination.start;
      i < Math.min(pagination.end, mailIDList.length);
      i++
    ) {
      const item = mailIDList[i];

      if (!newMails.some(mail => mail.id.toString() === item.id.toString())) {
        try {
          const response = await getMailItem(item.id);
          newMails.push(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }

    setMails(newMails);
    setLoading(false);
  } catch (error) {
    console.error('Error in getMails:', error);
    setLoading(false);
  }
};
