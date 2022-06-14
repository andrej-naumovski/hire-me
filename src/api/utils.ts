import { AxiosError } from 'axios';

export const withDefaultErrorMessage =
  <TArgs extends Array<unknown>, TReturnValue>(
    fn: (...args: TArgs) => Promise<TReturnValue>
  ) => async (...args: TArgs) => {
    try {
      return await fn(...args);
    } catch (e) {
      throw new Error((e as AxiosError<{ error?: string }>).response?.data.error ?? 'An unknown error occurred');
    }
  };
