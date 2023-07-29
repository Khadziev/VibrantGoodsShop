import { useNavigate } from 'react-router-dom';
import { MdNavigateBefore } from 'react-icons/md'
const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="absolute top-15 left-0 p-4">
      <MdNavigateBefore size={40}/>
    </button>
  );
};

export default BackButton;
