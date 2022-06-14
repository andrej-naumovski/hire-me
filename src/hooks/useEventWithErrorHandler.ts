import { useEventCallback } from '@mui/material';

const useEventWithErrorHandler =
    (
      handler: <TReturn>() => Promise<TReturn>,
      errorHandler: (message: string) => void
    ) => useEventCallback(async () => {
      try {
        await handler();
      } catch (e) {
        errorHandler((e as Error).message);
      }
    });

export default useEventWithErrorHandler;
