import {MailType} from '../types/MailType.ts';

export const getEmailSubject = (mail: MailType) => {
  const headers = mail.payload.headers;
  return headers.find(h => h.name === 'Subject');
};
