import { useMutation, useQueryClient } from 'react-query';
import { checkInChild } from '../../../api';

const useCheckinChild = () => {
  const queryClient = useQueryClient();

  return useMutation(checkInChild, {
    onSettled: () => queryClient.invalidateQueries('children')
  });
};

export default useCheckinChild;
