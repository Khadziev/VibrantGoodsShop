import Header from '../components/Header/Header';
import MainRouter from './routeConfig/MainRouter';
import { useAppSelector } from './providers/store';
import { ScrollToTop } from '../UI/ScrollToTop/ScrollToTop';
import Footer from '../components/Footer/Footer';
import HorizontalLine from '../UI/HorizontalLine/HorizontalLine';

function App () {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <div className="flex-grow">
        <div className="mb-10">
          {token ? (
            <MainRouter />
          ) : (
            <MainRouter />
          )}
        </div>
      </div>
      <div style={{ marginTop: '350px' }}>
        <HorizontalLine/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

