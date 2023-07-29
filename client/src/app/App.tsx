import Header from '../components/Header/Header';
import MainRouter from './routeConfig/MainRouter';
import { useAppSelector } from './providers/store';
import { ScrollToTop } from '../UI/ScrollToTop/ScrollToTop';

function App () {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <>
      <Header />
      <ScrollToTop />
      {token ? (
        <div className="flex h-full">
          <div className="flex-grow">
            <MainRouter />
          </div>
        </div>
      ) : (
        <MainRouter />
      )}

    </>
  );
}

export default App;
