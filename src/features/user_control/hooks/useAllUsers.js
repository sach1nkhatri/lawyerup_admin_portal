import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../app/api/api_endpoints';

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('lawyerup_token');
      const res = await axios.get(`${API.REGISTREEDUSER}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return { users, loading };
};

export default useAllUsers;