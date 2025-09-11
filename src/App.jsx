// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import UsersPage from './components/users/UsersPage';
import { VehiclePage } from '@/features/vehicle';
import VehicleChart from './components/VehicleChart';
// import CreateRollout from './features/rollout/component/CreateRollout';
import { ModelPage } from '@/features/model';
import { LoginPage } from "@/features/auth";
import { SignUpPage } from '@/features/signup';
import UploadBinary from './features/binary/page/UploadBinary';
import ConfirmSignup from './features/signup/pages/ConfirmSignup';
import { VariantPage } from '@/features/variants';
import PrivateRoute from './components/PrivateRoute';
import {Rollout} from '@/features/rollout';
import NewRollout from './features/rollout/component/NewRollout';
import VehicleInfo from './features/vehicle/components/VehicleInfo';
import { EcuPages } from '@/features/ecu';
import ModelInfo from './features/model/components/ModelInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/confirmsignup' element={<ConfirmSignup />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* <Route path="/users" element={<UsersPage />} /> */}
          <Route path="/vehicles" element={<VehiclePage />} />
          <Route path="/fleet" element={<VehicleChart />} />
          <Route path="/rollout" element={<Rollout />} />
          <Route path="/rollout/new" element={<NewRollout />} />
          <Route path='/models' element={<ModelPage />} />
          <Route path="/models/:modelName" element={<ModelInfo />} />
          <Route path='/variants' element={<VariantPage />} />
          <Route path='/ecu' element={<EcuPages/>} />
          <Route path='/uploadbinary' element={<UploadBinary />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleInfo />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
