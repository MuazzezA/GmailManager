import {MailType} from '../types/MailType.ts';

export const getEmailSubject = (mail: MailType) => {
  if (!mail) {
    return '';
  }
  const headers = mail.payload.headers;
  const subject = headers.find(h => h.name === 'Subject');
  return subject?.value;
};
