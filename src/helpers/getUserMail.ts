import {getUserData, getUserSession} from '../store/logic.ts';

export const getMail = async (searchText?: string) => {
  const user = await getUserData();
  const userId = user.user.id;
  const session = await getUserSession();

  if (!session) {
    throw Error;
  }
  const accessToken = JSON.parse(session).token;
  const headers = {Authorization: `Bearer ${accessToken}`};

  const query = !!searchText ? `?q=${searchText}` : '';

  const apiUrl =
    'https://www.googleapis.com/gmail/v1/users/' + userId + '/messages' + query;
  const mailList = await fetch(apiUrl, {
    headers: headers,
  });
  return await mailList.json();
};

export const getMailItem = async (id: string) => {
  const user = await getUserData();
  const userId = user.user.id;
  const session = await getUserSession();

  if (!session) {
    throw Error;
  }

  const accessToken = JSON.parse(session).token;
  const headers = {Authorization: `Bearer ${accessToken}`};

  const apiUrl =
    'https://www.googleapis.com/gmail/v1/users/' + userId + '/messages/' + id;

  const mailItemList = await fetch(apiUrl, {
    headers: headers,
  });

  return await mailItemList.json();
};
