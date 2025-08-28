// // Layout.jsx
// import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';

// const Layout = () => {
//   return (
//     <div className='flex flex-col h-screen'>
//       <Header />
//       <div className='flex flex-row flex-grow overflow-hidden'>
//         <div className='bg-gray-200 w-[20%] p-4'>
//           {/* <h2 className='text-black'>Sidebar</h2> */}
//           <Sidebar/>
//         </div>
//         <div className='bg-white w-[80%] p-4 overflow-auto scrollbar-hide'>
//           <Outlet /> {/* This renders nested routes */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;


// Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-row flex-grow overflow-hidden'>
        {/* Sidebar */}
        <div
          className={`bg-gray-200 transition-all duration-300 ${
            collapsed ? 'w-[5%]' : 'w-[13%]'
          }`}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main Content */}
        <div
          className={`bg-white p-4 overflow-auto scrollbar-hide transition-all duration-300 ${
            collapsed ? 'w-[95%]' : 'w-[87%]'
          }`}
        >
          <Outlet /> {/* This renders nested routes */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
