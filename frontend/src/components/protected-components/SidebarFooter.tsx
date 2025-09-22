import { CircleUserRound } from 'lucide-react';
import React from 'react';
import { getCurrentUser, logout } from '../../utils/authStorage';
import { useNavigate } from 'react-router-dom';

function SidebarFooter(props) {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <div className="px-4 py-6 border-t border-gray-300">
            <div className="relative group">
                <div className="flex items-center gap-4 cursor-pointer">
                    <CircleUserRound className="w-8 h-8" />
                    <div className="flex-1">
                        <p className="font-semibold text-sm">
                            {user.username}
                        </p>
                        <p className="text-xs">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-full mb-2 w-full rounded-lg shadow-lg hidden group-hover:block border border-gray-300 bg-white">
                    <a className="block px-4 py-2 text-sm  hover:bg-primary/10">
                        View Profile
                    </a>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarFooter;