// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './components/users/UsersPage';
import {VehiclePage} from '@/features/vehicle';
import VehicleChart from './components/VehicleChart';
import CreateRollout from './components/rollout/CreateRollout';
import{ ModelPage} from '@/features/model';
import { LoginPage } from "@/features/auth";
import { SignUpPage } from '@/features/signup';
import UploadBinary from './containers/UploadBinary';
import ConfirmSignup from './features/signup/pages/ConfirmSignup';
import {VariantPage} from '@/features/variants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/confirmsignup' element={<ConfirmSignup/>}/>
      
        {/* Routes with layout */}
        <Route element={<Layout />}>
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/vehicles" element={<VehiclePage />} />
          <Route path="/fleet" element={<VehicleChart />} />
          <Route path="/createrollout" element={<CreateRollout />} />
          <Route path='/models/vehicles' element={<ModelPage />} />
          <Route path='/models/variants' element={<VariantPage />} />
          <Route path='/uploadbinary' element={<UploadBinary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
