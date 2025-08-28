
import { useState } from 'react';
import {
  FaCarSide,
  FaThList,
  FaDatabase,
  FaChevronDown,
  FaChevronRight,
  FaCloudDownloadAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SidebarSection = ({ icon, title, children = [], routes }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    if (children.length > 0) {
      setOpen(!open);
    }
  };

  return (
    <div>
      {/* Parent Button */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center w-full px-2 py-2 text-gray-800 hover:bg-blue-200 rounded-md"
      >
        <span className="mr-3 text-blue-600">{icon}</span>
        <span className="flex-1 text-left font-medium">{title}</span>
        {children.length > 0 && (open ? <FaChevronDown /> : <FaChevronRight />)}
      </button>

      {/* Dropdown Children */}
      {open && children.length > 0 && (
        <div className="mt-1 space-y-1 text-sm text-gray-600">
          {children.map((child, index) => (
            <div
              key={index}
              onClick={() => routes?.children?.[index] && navigate(routes.children[index])}
              className="cursor-pointer hover:text-blue-950 py-2 hover:bg-blue-300 rounded-md pl-4"
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-gray-200 overflow-y-auto scrollbar-hide p-2">
      {/* Fleet button (no children, direct navigation) */}
      <div
        onClick={() => navigate('/fleet')}
        className="text-black font-semibold mb-4 px-2 py-2 text-md flex items-center bg-blue-300 rounded-md cursor-pointer hover:bg-blue-400"
      >
        <FaCarSide className="mr-2" />
        Fleet
      </div>

      <nav className="space-y-2 font-semibold">
        <SidebarSection
          icon={<FaCarSide />}
          title="Vehicles"
          children={['All Vehicles', 'Vehicle Groups']}
          routes={{
            children: ['/vehicles', '/vehicles/groups'],
          }}
        />
        <SidebarSection
          icon={<FaThList />}
          title="Models"
          children={['Vehicle Models', 'Model Variants', 'ECUs']}
          routes={{
            children: ['/models/vehicles', '/models/variants', '/models/ecus'],
          }}
        />
        <SidebarSection
          icon={<FaDatabase />}
          title="Inventory"
          children={['Software Packages', 'Data Maps', 'Log Configs']}
          routes={{
            children: ['/inventory/software', '/inventory/maps', '/inventory/configs'],
          }}
        />
        <SidebarSection
          icon={<FaCloudDownloadAlt />}
          title="Deployments"
           children={['Deployments','CreateRollout','Upload Binary']}
          routes={{
            children: ['/deployments','/createrollout','/uploadbinary'],
          }}
        />
      </nav>
    </div>
  );
};

export default Sidebar;

