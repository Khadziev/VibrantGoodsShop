import HomeContent from '@/widgets/home/HomeContent';

const UserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <HomeContent />
      </div>
    </div>
  );
};

export default UserPage;
