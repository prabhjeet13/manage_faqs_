import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AllFaqs from './pages/AllFaqs';
import FaqById from './pages/FaqById';
import AddFaq from './pages/AddFaq';
import AdminSignin from './pages/AdminSignin';
import AdminSignup from './pages/AdminSignup';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='bg-blue-400 mx-auto flex flex-col min-h-screen'>
        <Navbar/>
        <Routes>
              <Route path ='/' element = {<Signin/>}/>
              <Route path = '/signup' element = {<Signup/>}/>
              <Route path = '/get-all-faqs' element = {<AllFaqs/>}/>
              <Route path = '/get-a-faq/:faqid' element = {<FaqById/>}/>
              <Route path = '/add-faq' element = {<AddFaq/>}/>
              <Route path = '/admin/signin' element = {<AdminSignin/>}/>
              <Route path = '/admin/signup' element = {<AdminSignup/>}/>
              <Route path = '/profile' element = {<Profile/>}/>
              <Route />
        </Routes>
    </div>
  );
}

export default App;
