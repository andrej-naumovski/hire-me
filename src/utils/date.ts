import { parseISO } from 'date-fns';

import format from 'date-fns/fp/format';

const withParsedIsoDate = <T>
  (fn: (parsedDate: Date) => T) => (isoDate?: string | null): T | null => {
    if (!isoDate) {
      return null;
    }

    try {
      const parsed = parseISO(isoDate);

      return fn(parsed);
    } catch (e) {
      return null;
    }
  };

const formatParsedDate = (dateFormat: string) => withParsedIsoDate(format(dateFormat));

export const convertIsoToBirthday = formatParsedDate('dd-MM-YYYY');

export const getDateTimeFromIsoDate = formatParsedDate('dd-MM-YYYY HH:mm');
