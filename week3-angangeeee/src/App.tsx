import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/common/Navbar";
import { Home } from "./pages/Home";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { MoviePage } from "./pages/MoviePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

const DetailLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "popular", element: <MoviePage /> },
      { path: "now-playing", element: <MoviePage /> },
      { path: "top-rated", element: <MoviePage /> },
      { path: "upcoming", element: <MoviePage /> },
    ],
  },

  {
    path: "/",
    element: <DetailLayout />,
    errorElement: <NotFoundPage />,

    children: [{ path: "movie/:movieId", element: <MovieDetailPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
