import Header from '../components/Header/Header';
import MainRouter from './routeConfig/MainRouter';
import { ScrollToTop } from '../UI/ScrollToTop/ScrollToTop';
import Footer from '../components/Footer/Footer';
import HorizontalLine from '../UI/HorizontalLine/HorizontalLine';
import Sidebar from '../widgets/Sidebar/Sidebar';
import { useAppSelector } from './providers/store';

function App () {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop/>
      <div className="flex-grow">
        {token && <Sidebar/>}
        <div className="mb-10">
          <MainRouter />
        </div>
      </div>
      {token &&
        <div style={{ marginTop: '350px' }}>
          <HorizontalLine/>
          <Footer/>
        </div>
      }
    </div>
  );
}

export default App;
