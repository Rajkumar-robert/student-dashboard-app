import React, { useEffect } from 'react';
import {  MdClose, MdMenu, MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { fetchStudentsByCohortAndCourse, loadStudents } from '../redux/studentSlice';
import profile from '../assets/profile.png';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { RiMessage2Line } from 'react-icons/ri';
import { VscSettings } from 'react-icons/vsc';
import { PiBellBold } from 'react-icons/pi';

const Navbar = ({setIsOpened,isOpened}) => {
  const [searchItem, setSearchItem] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const uppercaseSearchItem = searchItem.toUpperCase(); // Convert to uppercase
    console.log(uppercaseSearchItem);
    if(uppercaseSearchItem.length > 2){
      dispatch(fetchStudentsByCohortAndCourse({ course: uppercaseSearchItem }));
    }
    else{
      dispatch(loadStudents());
    }
  }, [dispatch,searchItem]);
  
  return (
    <div className="fixed md:relative bg-white md:bg-transparent md:mt-4 w-screen md:w-full flex justify-between items-center h-16 px-4">
      {/* Search Bar */}
      <button
      className="md:hidden z-50 p-2 md:p-0 text-2xl bg-gray-100 rounded-full shadow"
      onClick={() => setIsOpened(!isOpened)}
      aria-expanded="false"
      aria-label="Open menu"
    >
      {!isOpened?<MdClose/>:<MdMenu />}
    </button>
      <div className="relative w-1/2 ml-2">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          placeholder="Search by course: CBSE 9"
          className="w-full bg-white text-[#425470] font-medium px-4 py-2 pl-10 rounded-lg focus:outline-none"
        />
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#425470] text-xl" />
      </div>

      {/* Icons and Profile Section */}
      <div className="flex gap-4 w-1/2 px-4 justify-end items-center space-x-4">
        <div className="md:flex gap-4 justify-center items-center space-x-4 hidden">
          <IoMdHelpCircleOutline className="text-gray-500 text-2xl" />
          <RiMessage2Line className="text-gray-500 text-2xl" />
          <VscSettings className="text-gray-500 text-2xl" />
          <PiBellBold  className="text-gray-500 text-2xl" />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <img src={profile} alt="Profile" width={40} className="rounded-md" />
          <h1 className='font-semibold md:block hidden'>Adline H. Dancy</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
