import { useEventCallback } from '@mui/material';

const useEventWithErrorHandler =
    <Handler extends (...args: any[]) => Promise<any>>(
    handler: Handler,
    errorHandler: (message: string) => void
  ) => useEventCallback(async (...args: Parameters<Handler>) => {
    try {
      await handler(...args);
    } catch (e) {
      errorHandler((e as Error).message);
    }
  });

export default useEventWithErrorHandler;
