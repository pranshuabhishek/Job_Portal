import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Popover, PopoverTrigger, PopoverContent} from '../ui/popover.jsx';
import { Avatar, AvatarImage  } from "../ui/avatar.jsx";
import { Button} from '../ui/button.jsx';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { setUser } from '@/redux/authSlice.js';
import Logo from "../Logo.jsx";

function Navbar() {
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
        const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
        if(res.data.success){
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
            setMobileMenuOpen(false);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
  }

  const navLinks = user && user.role == 'recruiter' ? (
      <>
          <li><Link to="/admin/home" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)}>Companies</Link></li>
          <li><Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link></li>
      </>
  ): (
      <>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link></li>
          <li><Link to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse</Link></li>
          <li><Link to="/saved-jobs" onClick={() => setMobileMenuOpen(false)}>Saved</Link></li>
      </>
  );

  return (
    <div className='bg-gray-400 relative'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
            <div className='flex items-center gap-2'>
                <Logo size={28} />
                <h1 className='text-xl md:text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
            </div>

            {/* Desktop nav */}
            <div className='hidden md:flex items-center gap-8 lg:gap-12'>
                <ul className='flex font-medium items-center gap-5'>
                    {navLinks}
                </ul>

                {
                    !user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant='outline' className="hover:bg-[#2A38C1]">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#6b30a6]">Signup</Button></Link>
                        </div>
                    ): (
                         <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-gray-200">
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2/>
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut/>
                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                         </Popover>
                        )
                }
            </div>

            {/* Mobile: avatar/hamburger */}
            <div className='flex md:hidden items-center gap-3'>
                {
                    user && (
                        <Avatar className="cursor-pointer h-8 w-8">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                    )
                }
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='p-1'>
                    {mobileMenuOpen ? <X className='h-6 w-6'/> : <Menu className='h-6 w-6'/>}
                </button>
            </div>
        </div>

        {/* Mobile dropdown menu */}
        {
            mobileMenuOpen && (
                <div className='md:hidden bg-gray-300 px-4 py-4 flex flex-col gap-4'>
                    <ul className='flex flex-col gap-3 font-medium'>
                        {navLinks}
                    </ul>

                    {
                        !user ? (
                            <div className='flex flex-col gap-2'>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant='outline' className="w-full">Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-[#6A38C2] hover:bg-[#6b30a6]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3 border-t pt-3'>
                                <div className='flex items-center gap-2'>
                                    <User2 className='h-4 w-4'/>
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className='text-sm'>View Profile</Link>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer' onClick={logoutHandler}>
                                    <LogOut className='h-4 w-4'/>
                                    <span className='text-sm'>Logout</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default Navbar