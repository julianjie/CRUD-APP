import React,{Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route,NavLink} from 'react-router-dom'

const Home = React.lazy(() => import('./components/Home'))
const FakultasList = React.lazy(() => import('./components/Fakultas/List'))
const FakultasCreate = React.lazy(() => import('./components/Fakultas/Create'))
const FakultasEdit = React.lazy(() => import('./components/Fakultas/Edit'))
const ProdiList = React.lazy(() => import('./components/Prodi/List'))
const ProdiCreate = React.lazy(() => import('./components/Prodi/Create'))
const ProdiEdit = React.lazy(() => import('./components/Prodi/Edit'))

function App() {
  
  return (
    <Router>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">MDP</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/'}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/fakultas'}>Fakultas</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/prodi'}>Prodi</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path= '/' element={<Home/>}/>
          <Route path= '/fakultas' element={<FakultasList/>}/>
          <Route path= '/fakultas/create' element={<FakultasCreate/>}/>
          <Route path= '/fakultas/Edit/:id' element={<FakultasEdit/>}/>
          <Route path= '/prodi' element={<ProdiList/>}/>
          <Route path= '/prodi/create' element={<ProdiCreate/>}/>
          <Route path= '/Prodi/Edit/:id' element={<ProdiEdit/>}/>
        </Routes>
      </Suspense>
    </Router>
  )
}
export default App

