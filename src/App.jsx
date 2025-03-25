// UTILITY
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


// COMPONENTS
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";


function App() {

  return (
    <>
      <BrowserRouter>

        <nav>
          <NavLink to='/' >Lista Task</NavLink>
          <NavLink to='/add' >Aggiungi Task</NavLink>
        </nav>

        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/add' element={<AddTask />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
