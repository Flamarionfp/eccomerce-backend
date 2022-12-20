import { AppError } from '@/App.error';

export const queryBy = <T>(query: T, allowedQueries: Array<string>) => {
  const queryEntries = Object.entries(query);
  let formattedQuery = {};

  queryEntries.forEach(([key, value]) => {
    if (!allowedQueries.includes(key)) {
      throw new AppError(`Invalid query: ${key}`);
    }

    if (value) {
      formattedQuery = {
        ...formattedQuery,
        [key]: {
          equals: value,
          mode: 'insensitive',
        },
      };
    }
  });

  return formattedQuery;
};
