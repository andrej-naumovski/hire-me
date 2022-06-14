import { parseISO, isValid } from 'date-fns';

import format from 'date-fns/fp/format';

const withParsedIsoDate = <T>
  (fn: (parsedDate: Date) => T) => (isoDate?: string | null): T | null => {
    if (!isoDate) {
      return null;
    }

    const parsed = parseISO(isoDate);

    if (!isValid(parsed)) {
      return null;
    }

    return fn(parsed);
  };

const formatParsedDate = (dateFormat: string) => withParsedIsoDate(format(dateFormat));

export const convertIsoToBirthday = formatParsedDate('dd-MM-yyyy');

export const getDateTimeFromIsoDate = formatParsedDate('dd-MM-yyyy HH:mm');

export const getTimeFromDateObject = format('HH:mm');
