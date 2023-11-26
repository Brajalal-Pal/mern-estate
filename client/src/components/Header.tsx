import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// process avatar image from username if no avatar is provided
const Avatar = (username: string) => {
    // get the first letter of the username
    const firstLetter = username.charAt(0);

    return (
        <div style={{ backgroundColor: "#ddd", width: "24px", alignItems: "center", justifyContent: "center", height: "24px", borderRadius: "50%" }}>
            {firstLetter.toUpperCase()}
        </div>
    )
}


function Header() {
    const userInfo = useSelector((state: any) => state?.user?.currentUser?.user);
    const handleSignout = () => {
        localStorage.removeItem('persist:root');
        window.location.href = '/sign-in';
    }

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to={'/'}>
                    <h1 className="font-bold text-sm:text-xl flex flex-wrap" style={{ border: "1px solid #edd", padding: "5px", borderRadius: "10px", backgroundColor: "#ddd" }}>
                        <span style={{ fontStyle: "italic", color: "darkgreen" }}>Paul</span>
                        <span style={{ fontStyle: "italic", color: "darkgoldenrod" }}>Estate</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
                    <FaSearch className="text-slate-600" />
                </form>

                <ul className='flex gap-4'>
                    <Link to={'/'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to={'/about'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    {
                        userInfo && userInfo.username ? (
                            <>
                                <Link to={'/sign-out'}>
                                    <li className='sm:inline text-slate-700 hover:underline' onClick={handleSignout}>
                                        Sign Out
                                    </li>
                                </Link>
                                <Link to={'/profile'}>
                                    <li className='sm:inline text-slate-700 hover:underline'>
                                        {
                                            userInfo && userInfo.avatar ? (<img src={userInfo && userInfo.avatar ? userInfo.avatar : ''} alt={userInfo.username} style={{ backgroundColor: "#ddd", width: "24px", alignItems: "center", justifyContent: "center", height: "24px", borderRadius: "50%" }} />) :
                                                (Avatar(userInfo.username))
                                        }
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <Link to={'/sign-in'}>
                                <li className='sm:inline text-slate-700 hover:underline'>
                                    Sign In
                                </li>
                            </Link>
                        )
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header
