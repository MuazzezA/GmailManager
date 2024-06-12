import {useState} from 'react';
import {MailType} from '../types/MailType.ts';
import {getMail} from '../helpers/getUserMail.ts';
import {getMails} from '../helpers/getMails.ts';

export const useSearchMail = () => {
  const [searchResult, setSearchResult] = useState<MailType[]>([]);
  const [mailIDList, setMailIDList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 20,
  });

  const searchMail = async (searchText: string) => {
    if (mailIDList?.length > 0 || loading) {
      return;
    }
    setLoading(true);
    getMail(searchText)
      .then(async res => {
        if (res?.resultSizeEstimate > 0) {
          setMailIDList(res?.messages);

          await getMails({
            setLoading,
            pagination,
            mailIDList: res?.messages,
            mails: searchResult,
            setMails: setSearchResult,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return {
    searchMail,
    searchResult,
    searchResultLoading: loading,
    setSearchPagination: setPagination,
    searchPagination: pagination,
  };
};
