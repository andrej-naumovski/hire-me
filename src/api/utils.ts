import { AxiosError } from 'axios';

export const withDefaultErrorMessage =
    <T>(fn: (...args: any[]) => Promise<T>) => async (...args: any[]) => {
    try {
      return await fn(args);
    } catch (e) {
      throw new Error((e as AxiosError<{ message?: string }>).response?.data.message ?? 'An unknown error occurred');
    }
  };
