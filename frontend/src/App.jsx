import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css'
import './tailwind.css'
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getLoggedInUser } from './network/listdatas_api.ts';
import Documentation from './components/Documentation';
import NotFound from './components/NotFound';
import InspoPage from "./components/InspoPage";
import BucketLists from "./components/BucketLists";
import CreateBucketListPage from "./components/CreateBucketListPage";
import FriendsPage from "./components/FriendsPage";
import HomePage from "./components/HomePage";
import MapPage from "./components/MapPage";
import EditBucketListItem from "./components/EditBucketListItem";
import { ToastContainer } from 'react-toastify';
function App() {

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
      <>
      <Router>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/App/Inspiration" element={<InspoPage />} />
          <Route path="/App/Friends" element={<FriendsPage />} />
          <Route path="/App/BucketLists" element={<BucketLists />} />
            <Route path="/App/BucketLists/EditBucketList" element={<EditBucketListItem />} />
            <Route path="/App/Map" element={<MapPage />} />
            <Route path="*" element={<NotFound />} /> {/* 404-Fehlerseite */}
        </Routes>
      </Router>
          <ToastContainer />
      </>
  );
}

export default App;
