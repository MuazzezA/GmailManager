export type MailType = {
  id: number;
  threadId: number;
  snippet: string;
  labelIds: string[];
  payload: {
    partId: string;
    fileName: string;
    headers: {name: string; value: string}[];
    body: {data: string};
    parts: {mimeType: string; body: {data: string}}[];
  };
  historyId: string;
  internalDate: string;
  sizeEstimate: number;
};
