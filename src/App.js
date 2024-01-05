import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Redirect from './redirect';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ForgotPassword from './components/Forgot Password/forgottenpassword';
import Myaccount from './components/My Account/myaccount';
import ImageGenerator from './components/ImageGenerator/ImageGenerator';
import Lumina from './components/Lumina/lumina'
import ImageAnalyzer from './components/Image Analyzer/imageanalyzer';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route exact path="/" element={<Redirect/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path='/Signup' element={<Signup/>}/>
        <Route exact path='/Signin' element={<Signin/>}/>
        <Route exact path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/myaccount" element={<Myaccount/>}/>
        <Route exact path="/imagegenerator" element={<ImageGenerator/>}/>
        <Route exact path="/lumina" element={<Lumina/>}/>
        <Route exact path="/ImageAnalyzer" element={<ImageAnalyzer/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
