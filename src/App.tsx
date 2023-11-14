import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { NotFoundPage } from "./routes/NotFoundPage"
import { SearchSpecialistPagePath, SearchSpecialistPage } from "./routes/SearchSpecialistPage"

const router = createBrowserRouter([
  {
    path: SearchSpecialistPagePath,
    element: <SearchSpecialistPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
