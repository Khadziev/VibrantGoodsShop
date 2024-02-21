import React from "react";
import { useNavigate } from 'react-router-dom';
import { MdNavigateBefore } from 'react-icons/md'



const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="left-0 p-2 fixed ml-12 text-green-500 pt-24">
      <MdNavigateBefore size={40}/>
    </button>
  );
};

export default BackButton;
