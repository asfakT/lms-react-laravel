import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Courses from './components/pages/Courses'
import Detail from './components/pages/Detail'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import MyCourses from './components/pages/account/MyCourses'
import WatchCourse from './components/pages/account/WatchCourse'
import MyLearning from './components/pages/account/MyLearning'
import ChangePassword from './components/pages/account/ChangePassword'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/pages/account/Dashboard'
import { RequireAuth } from './components/common/RequireAuth'
import CreateCourse from './components/pages/account/courses/CreateCourse'
import EditCourse from './components/pages/account/courses/EditCourse'
import EditLesson from './components/pages/account/courses/EditLesson'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/my-courses' element={<MyCourses />} />
          <Route path='/account/my-learning' element={<MyLearning />} />
          <Route path='/account/watch-course' element={<WatchCourse />} />
          <Route path='/account/change-password' element={<ChangePassword />} />

          <Route path='/account/dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />

          <Route path='/account/courses/create' element={
            <RequireAuth>
              <CreateCourse />
            </RequireAuth>
          } />

          <Route path='/account/courses/edit/:id' element={
            <RequireAuth>
              <EditCourse />
            </RequireAuth>
          } />

          <Route path='/account/courses/edit-lesson/:id/:courseId' element={
            <RequireAuth>
              <EditLesson />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        reverseOrder={false}
      />

    </>
  )
}

export default App
