import { AuthContext } from '@/components/authProvider/AuthProvider'
import React, { useContext } from 'react'

function UserHeading() {
  const {userData} = useContext(AuthContext);
  // console.log(userData);
  return (
    <div className='mt-16'>
        {/* UpperPicture */}
      <div className="upperProfile px-8 py-8 rounded-xl">
          <div className="relative bg-cover bg-center h-[500px] bg-[url('picture/userBg.avif')] rounded-xl">
              <div className="absolute backdrop-blur-lg bg-white/30 md:backdrop-filter-none bottom-0 w-full flex items-center py-5 justify-between">
                  {/* Left Info */}
                  <div className="userInfo flex flex-cols px-8 items-center">
                      <div
                        className="bg-cover w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-2 ring-indigo-300"
                        style={{ backgroundImage: `url(${userData.avatar})` }}
                      ></div>
                      <div className="information px-8 items-center">
                        <h1 className="text-orange-600 text-semibold">{userData.username}</h1>
                        <h2>Địa chỉ: {userData.address}</h2>
                        <h2>Email: {userData.email}</h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
    </div>
  )
}

export default UserHeading