// UTILITY
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


// CONTEXT
import { GlobalProvider } from "./context/GlobalContext";


// COMPONENTS
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetails";


function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>

          <nav className="debug">
            <NavLink to='/' className="debug">Lista Task</NavLink>
            <NavLink to='/add' className="debug">Aggiungi Task</NavLink>
          </nav>

          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/add' element={<AddTask />} />
            <Route path='/task/:id' element={<TaskDetail />} />
          </Routes>

        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
