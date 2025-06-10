import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard since this is the main app interface
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default HomePage;