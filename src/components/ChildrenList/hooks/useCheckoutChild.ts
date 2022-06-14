import { useMutation, useQueryClient } from 'react-query';
import { checkOutChild } from '../../../api';

const useCheckoutChild = () => {
  const queryClient = useQueryClient();

  return useMutation(checkOutChild, {
    onSettled: () => queryClient.invalidateQueries('children')
  });
};

export default useCheckoutChild;
