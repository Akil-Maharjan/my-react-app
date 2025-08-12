import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { getAuthFromLocal } from '../features/auth/local/local';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuthFromLocal();
    if (auth) {
      dispatch(setUser(auth));
    }
  }, [dispatch]);

  return null;
}