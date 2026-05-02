import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Blog from './pages/Blog';
import BlogDetail from './components/blog/BlogDetail';
import Login from './pages/Login';

import Dashboard from './pages/dashboard/Dashboard'
import ManageBlog from './pages/dashboard/ManageBlog';
import ManageUsers from './pages/dashboard/Manageusers';

import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Tes from './pages/Tes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/tes" element={<Tes />} />

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* Protected Routes (Semua Role) */}
        <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/manage-blog" element={<Layout><ManageBlog /></Layout>} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/manage-user" element={<Layout><ManageUsers /></Layout>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
