import useAllUsers from './useAllUsers';

const useLawyers = () => {
  const { users, loading } = useAllUsers();
  const filteredLawyers = users.filter(user => user.role === 'lawyer');
  return { lawyers: filteredLawyers, loading };
};

export default useLawyers;