// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './components/users/UsersPage';
import { VehiclePage } from '@/features/vehicle';
import VehicleChart from './components/VehicleChart';
import CreateRollout from './components/rollout/CreateRollout';
import { ModelPage } from '@/features/model';
import { LoginPage } from "@/features/auth";
import { SignUpPage } from '@/features/signup';
import UploadBinary from './features/binary/page/UploadBinary';
import ConfirmSignup from './features/signup/pages/ConfirmSignup';
import { VariantPage } from '@/features/variants';
import PrivateRoute from './components/PrivateRoute';

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
