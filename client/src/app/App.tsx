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
        {token ? (
          <div className="flex h-full">
            <div className="flex-grow">
              <MainRouter />
            </div>
          </div>
        ) : (
          <MainRouter />
        )}
      </div>
      <HorizontalLine/>
      <Footer/>
    </div>
  );
}


export default App;
