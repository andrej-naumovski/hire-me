import { useQuery } from 'react-query';
import { fetchChildrenList } from '../../../api';

const useChildrenList = () => useQuery('children', fetchChildrenList);

export default useChildrenList;
