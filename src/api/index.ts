import axios from 'axios';
import { Child } from './types';
import { withDefaultErrorMessage } from './utils';

const famlyInstance = axios.create({
  baseURL: 'https://app.famly.co/api/'
});

famlyInstance.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'get') {
    // eslint-disable-next-line no-param-reassign
    config.params.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  } else {
    // eslint-disable-next-line no-param-reassign
    config.data.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  }

  return config;
});

export const fetchChildrenList =
  withDefaultErrorMessage(async () => {
    const { data } = await famlyInstance.get<{ children: Array<Child> }>('/daycare/tablet/group', {
      params: {
        groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
        institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
      }
    });

    return data.children;
  });

export const checkInChild =
  withDefaultErrorMessage<[{ childId: string, pickupTime: string }], void>(
    async ({ childId, pickupTime }) => {
      await famlyInstance.post(`/v2/children/${childId}/checkins`, {
        pickupTime
      });
    }
  );

export const checkOutChild =
  withDefaultErrorMessage<[string], void>(
    async (childId) => {
      await famlyInstance.post(`v2/children/${childId}/checkout`);
    }
  );
