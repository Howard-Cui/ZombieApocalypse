import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import RouterTable from './routers/RouterTable'


const router = createBrowserRouter(RouterTable);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
