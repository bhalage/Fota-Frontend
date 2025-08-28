
import { useDispatch } from 'react-redux';
import fevlogo from '../assets/fevlogo.png';
import { logout } from '../redux/slice/authSlice';
import { FiLogOut } from 'react-icons/fi';
const Header = () => {
const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // Optional: redirect to login page
    window.location.href = "/";
  };
  return (
    <>
    
<div className='bg-blue-950 w-full h-auto flex justify-between items-center px-4 py-2'>
  <img src={fevlogo} alt='fev logo' className='w-24 cursor-pointer' />
<button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
  <FiLogOut size={20} />
  Logout
</button>
</div>

    </>
  )
}

export default Header