import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import { Home } from './components/Home';
import { AppMenu } from './components/Menu';
import { DogsDetails } from './components/dogs/DogsDetails';
import { DogsDelete } from './components/dogs/DogsDelete';
import { DogsAdd } from './components/dogs/DogsAdd';
import { DogsShowAll } from './components/dogs/DogsShowAll';
import { DogsUpdate } from './components/dogs/DogsUpdate';
import { DogsFilter } from './components/dogs/DogsFilter';

function App() {
  const [count, setCount] = useState(0)

  return (
 /*   <React.Fragment>
      <DogsShowAll/>
        <div className="App">
          
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
    </React.Fragment>
    */
   
    <React.Fragment >
			<Router>
        <AppMenu />
				<Routes>
					<Route path="/" element={<Home />} />
          <Route path="/dogs" element={<DogsShowAll />} />
          <Route path="/dogs/:dogId/details" element={<DogsDetails />} />
					<Route path="/dogs/:dogId/edit" element={<DogsUpdate />} />
					<Route path="/dogs/:dogId/delete" element={<DogsDelete />} />
					<Route path="/dogs/add" element={<DogsAdd />} />
          <Route path="/dogs/avg-by-toy-price" element={<DogsFilter />} />

				</Routes>
      
			</Router>
      
		</React.Fragment>



  )
}

export default App
