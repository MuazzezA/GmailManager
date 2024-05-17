import {Buffer} from 'buffer';
import {MailType} from '../types/MailType.ts';

export const getMailBody = (mail: MailType) => {
  let emailBody = '';
  const payload = mail?.payload;
  const parts = payload?.parts;

  if (parts && parts.length) {
    parts.forEach(part => {
      if (part.mimeType === 'text/plain') {
        emailBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
      } else if (part.mimeType === 'text/html') {
        emailBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    });
  } else {
    emailBody = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  return emailBody;
};
