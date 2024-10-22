import React from 'react'

import Createpost from './components/Createpost'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Allposts from './components/Allposts'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Userposts from './components/Userposts'
import Userprofile from './components/Userprofile'
import Readmore from './components/Readmore'

function App() {
  return (
    <>
  
<Routes> 
  
<Route path='/' element={<Home/>}></Route>
  <Route path='/signup' element={<Signup/>}> </Route>
  <Route path='/allposts' element={<Allposts/>}></Route>
  <Route path='/create' element={<Createpost/>}></Route>
  <Route path='/login' element={<Login/>}> </Route>
  <Route path='/userpost' element={<Userposts/>}> </Route>
  <Route path='/userprofile' element={<Userprofile/>}> </Route>
  <Route path='/readmore/:id' element={<Readmore/>}> </Route>

</Routes>


    </>
  )
}

export default App