import React from 'react'
import { Link } from "react-router-dom";


export default function Signup() {
  return (
    <div className='bg-[#A8E4F2] font-sans m-0 p-0 flex justify-center items-center height-[100vh] '>
    <div className="m-0 p-0 flex justify-center items-center h-[100vh]">
    
        <form action="/Login" method="get">
        <h2 className="text-primary-blue font-bold text-center mb-6 text-lg ">Create an Account</h2>
            <div className="flex gap-2">
                <div>
                    <label className="font-bold" for="first-name">First Name:</label>
                    <input className="w-[100%] p-2 mt-2 mb-5 rounded-sm" type="text" id="first-name" name="first-name" required/>
                </div>
                <div>
                    <label className="font-bold" for="last-name">Last Name:</label>
                    <input className="w-[100%] p-2 mt-2 mb-5 rounded-sm" type="text" name="last-name" id="last-name" required/>
                </div>
            </div>
           

            <label className="font-bold" for="email">Email Address:</label>
            <input className="w-[100%] p-2 mt-2 mb-5 rounded-sm" type="email" id="email" name="email" required/>

            <label className="font-bold" for="password">Create Password:</label>
            <input className="w-[100%] p-2 mt-2 mb-5 rounded-sm" type="password" id="password" name="password" required/>

            <button className='font-bold justify-center' type="submit">Sign Up</button>

            <Link to="/Login" className="block text-center mt-6 font-bold text-primary-blue"> Back</Link>

            
        </form>
       
        </div>
        </div>
      )
    }
  
    // <div className="m-0 p-0 flex justify-center items-center h-screen">
      
    // <div class="bg-white w-full">
    //     <h2 className="text-primary-blue font-bold text-center mb-6">Create an Account</h2>
    //     <form  action="login.html" method="get">
    //         <div class="flex gap-2">
    //             <div>
    //                 <label className="font-bold text-primary-blue" for="first-name">First Name:</label>
    //                 <input className='w-full p-3 mt-2 mb-5' type="text" id="first-name" name="first-name" required/>
    //             </div>
    //             <div>
    //                 <label className="font-bold text-primary-blue" for="last-name">Last Name:</label>
    //                 <input className='w-full p-3 mt-2 mb-5' type="text" name="last-name" id="last-name" required/>
    //             </div>
    //         </div>
           

    //         <label className="font-bold text-primary-blue" for="email">Email Address:</label>
    //         <input className='w-full p-3 mt-2 mb-5' type="email" id="email" name="email" required/>

    //         <label className="font-bold text-primary-blue" for="password">Create Password:</label>
    //         <input className='w-full p-3 mt-2 mb-5' type="password" id="password" name="password" required/>

    //         <button className="bg-[#002b5c]" type="submit">Sign Up</button>

           
    //     </form>

        
        // <Link to="/Login" className="block text-center mt-6 font-bold text-primary-blue"> Back</Link>
        
    
//   )
// }

