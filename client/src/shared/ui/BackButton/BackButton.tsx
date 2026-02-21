import { useNavigate } from 'react-router-dom';
import { MdNavigateBefore } from 'react-icons/md';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed left-4 top-20 p-2 text-blue-500 hover:text-blue-700 z-10"
      aria-label="Назад"
    >
      <MdNavigateBefore size={32} />
    </button>
  );
};

export default BackButton;
