import { AxiosError } from 'axios';

export const withDefaultErrorMessage =
    <TArgs extends Array<any>,
    TReturnValue>(fn: (...args: TArgs) => Promise<TReturnValue>) => async (...args: TArgs) => {
    try {
      return await fn(...args);
    } catch (e) {
      throw new Error((e as AxiosError<{ message?: string }>).response?.data.message ?? 'An unknown error occurred');
    }
  };
