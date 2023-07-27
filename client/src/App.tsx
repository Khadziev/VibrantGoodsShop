import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainRouter from './components/routeConfig/MainRouter';
import { useAppSelector } from './redux/store';

function App () {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return ( <><MainRouter /><Header /></>);
  }

  return (
    <>
      <Header />
      <div className="flex h-full">
        {/* <div>
          <Sidebar />
        </div> */}
        <div className="flex-grow">
          <MainRouter />
        </div>
      </div>
    </>
  );

}

export default App;
