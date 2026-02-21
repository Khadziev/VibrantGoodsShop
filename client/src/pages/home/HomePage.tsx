import { useEffect } from 'react';
import { useAppSelector } from '@/app/providers/store';
import { UserRole } from '@/features/auth/model/model';
import AdminPage from '@/pages/admin/AdminPage';
import UserPage from '@/pages/user/UserPage';

const HomePage: React.FC = () => {
  const userRole = useAppSelector((state) => state.auth.role) || localStorage.getItem('userRole');
  const userName =
    useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');

  useEffect(() => {
    if (userRole && userName) {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole, userName]);

  if (userRole === UserRole.ADMIN) {
    return <AdminPage />;
  }

  if (userRole === UserRole.USER) {
    return <UserPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))]">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-semibold text-[rgb(var(--color-text-base))] mb-4 tracking-tight">
          Добро пожаловать!
        </h1>
        <p className="text-lg text-[rgb(var(--color-text-secondary))]">
          Выберите категорию или войдите в систему
        </p>
      </div>
    </div>
  );
};

export default HomePage;
