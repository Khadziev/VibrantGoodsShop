import Header from '@/widgets/header/Header/Header';
import MainRouter from './routeConfig/MainRouter';
import { ScrollToTop } from '@/shared/ui/ScrollToTop/ScrollToTop';
import Footer from '@/widgets/footer/Footer/Footer';
import { useAppSelector } from './providers/store';
import './styles/index.css';

function App () {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(var(--color-bg))]">
      <Header />
      <ScrollToTop />
      <div className="flex-grow">
        <MainRouter />
      </div>
      {token && <Footer />}
    </div>
  );
}

export default App;
