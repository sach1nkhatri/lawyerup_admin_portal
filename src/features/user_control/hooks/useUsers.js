import useAllUsers from './useAllUsers';

const useUsers = () => {
  const { users, loading } = useAllUsers();

  // ✅ Only keep users with exact role 'user'
  const filteredUsers = users.filter(user => user.role === 'user');

  return { users: filteredUsers, loading };
};

export default useUsers;
