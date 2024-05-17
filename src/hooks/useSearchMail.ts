import React, {useEffect, useState} from 'react';
import {MailType} from '../types/MailType.ts';
import Fuse from 'fuse.js';
import {getEmailSender} from '../helpers/getEmailSender.ts';

export const useSearchMail = (mails: MailType[]) => {
  const [searchResult, setSearchResult] = useState([]);
  const [formattedMails, setFormattedMails] = useState<MailType[] | null>(null);

  useEffect(() => {
    const formatted = mails.map(m => {
      return {
        sender: getEmailSender(m),
        subject: getEmailSender(m),
        ...m,
      };
    });
    setFormattedMails(formatted);
  }, []);

  const searchMail = (searchText: string) => {
    const options = {
      includeScore: true,
      keys: ['snippet', 'sender', 'subject'],
    };

    const fuse = new Fuse(formattedMails, options);

    setSearchResult(fuse.search(searchText));
  };

  return {searchMail, searchResult};
};
