import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import TopicPage from './pages/TopicPage.jsx';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/topic/:topic"element={<TopicPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
      
      
  );
}

export default App
