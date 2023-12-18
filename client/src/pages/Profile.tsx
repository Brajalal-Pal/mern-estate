// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

function Profile() {
   // const navigate = useNavigate();
   const { currentUser } = useSelector((state: any) => state.user);
   const { username, email, avatar } = currentUser.user;
   const fileRef = useRef<HTMLInputElement>(null);

   // useEffect(() => {
   //    console.log("currentUser", currentUser);
   //    if (!currentUser) {
   //       navigate("/sign-in");
   //    }
   // }, [navigate]);

   // console.log("currentUser", currentUser);

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
         <form className="flex flex-col gap-3">
            <input type="file" className="hidden" ref={fileRef} accept="image/*" />
            <img
               onClick={() => fileRef?.current?.click()}
               src={avatar}
               alt="Profile"
               className="rounded-full h-24 h-24 object-cover cursor-pointer self-center mt-2"
            />
            <input type="text" placeholder="Username" id="username" className="border p-3 rounded-lg" value={username} />
            <input type="email" placeholder="Email" id="email" className="border p-3 rounded-lg" value={email} />
            <input type="password" placeholder="Password" id="password" className="border p-3 rounded-lg" />
            <button type="button" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
               Update
            </button>
         </form>
         <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete account</span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
      </div>
   );
}

export default Profile;
