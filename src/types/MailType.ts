export type MailType = {
  id: number;
  threadId: number;
  snippet: string;
  labelIds: string[];
  payload: {
    partId: string;
    fileName: string;
    headers: {name: string; value: string}[];
    body: unknown;
    parts: unknown[];
  };
  historyId: string;
  internalDate: string;
  sizeEstimate: number;
};
