import React from "react";
import { userSelector } from "../Redux/Reducers/userReducer";
import { useSelector } from "react-redux";

const Email = () => {
  const { user } = useSelector(userSelector);
  return (
     <div className="   flex lg:flex-row flex-col justify-center pt-24 mb-24 ">
         <div className="flex flex-col  self-center md:w-1/2  w-auto text-center space-y-2 ">
             <div className="self-center">
                 <h1 className="md:text-3xl text-xl font-bold">Please verify you email...</h1>
             </div>
             <div className="self-center">
                 <img className="md:h-36 h-28" src="https://res.cloudinary.com/df8suxer2/image/upload/v1713086292/yplpzknxvtyagr3vtvc7.jpg" alt="message logo" />
             </div>
             <div className="md:text-base text-sm self-center text-zinc-500">
                 <h1>Please verify your email address. We,ve sent a confirmation email to:</h1>
             </div>
             <div className="pt-4 md:text-base text-sm self-center md:text-base text-sm font-bold">
                 <h1>{user.email}</h1>
             </div>
             <div className="pt-4 md:text-base text-sm self-center text-zinc-500">
                 <h1>Click the confirmation link in that email to begin using Dribbble.</h1>
             </div>

             <div className="pt-4 md:text-base text-sm self-center text-zinc-500  ">
                 <h1 className="">
                     Didn't receive the email? Check your Spam folder, it may have been caught by a filter. if you still dont't see it, you
                     can <span className="text-pink-500 font-semibold" >resend the confirmation email.</span>
                 </h1>
             </div>
             <div className="pt-4 md:text-base text-sm self-center text-zinc-500  ">
                 <h1 className="">
                     Wrong email address?<span className="text-pink-500 font-semibold" >  Change it.</span>
                 </h1>
             </div>

         </div>

     </div >
  );
};

export default Email;
