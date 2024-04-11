import {MailType} from '../types/MailType.ts';

export const getEmailSender = (mail: MailType) => {
  const headers = mail.payload.headers;
  const fromHeader = headers.find(h => h.name === 'From');
  return fromHeader
    ? fromHeader.value.split('<')[0].replace(/"/g, '').trim()
    : '';
};
