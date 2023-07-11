import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/Homelayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement:<h1>error</h1>,
    children: [
      {
        index: true,
        element: <h1>hi</h1>,
        errorElement: <h1>error</h1>,
        // loader: landingLoader(queryClient),
      },
      {
        path: 'about',
        element: <h1>hello</h1>,
      },
    ],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;

// import Footer from "./components/Footer/Footer"
// import Navbar from "./components/Navbar/Navbar"

// function App() {
//   return <div>
//     <Navbar/>
//     <Footer/>
//   </div>
// }

// export default App
