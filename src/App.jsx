import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/features/signup/pages/SignUpPage'));
const ConfirmSignup = lazy(() => import('@/features/signup/pages/ConfirmSignup'));
const VehiclePage = lazy(() => import('@/features/vehicle/pages/Vehicle'));
const VehicleChart = lazy(() => import('./components/VehicleChart'));
const ModelPage = lazy(() => import('@/features/model/pages/Model'));
const ModelInfo = lazy(() => import('@/features/model/components/ModelInfo'));
const VariantPage = lazy(() => import('@/features/variants/pages/Variant'));
const Rollout = lazy(() => import('@/features/rollout/page/Rollout'));
const VehicleInfo = lazy(() => import('@/features/vehicle/components/VehicleInfo'));
const EcuPages = lazy(() => import('@/features/ecu/pages/EcuPages'));
const UploadBinary = lazy(() => import('./features/binary/page/UploadBinary'));
const Admin = lazy(() => import('@/features/admin/page/Admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirmsignup" element={<ConfirmSignup />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/vehicles" element={<VehiclePage />} />
            <Route path="/fleet" element={<VehicleChart />} />
            <Route path="/rollout" element={<Rollout />} />
            <Route path="/models" element={<ModelPage />} />
            <Route path="/models/:modelName" element={<ModelInfo />} />
            <Route path="/variants" element={<VariantPage />} />
            <Route path="/ecu" element={<EcuPages />} />
            <Route path="/uploadbinary" element={<UploadBinary />} />
            <Route path="/vehicles/:vehicleId" element={<VehicleInfo />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;


// github
