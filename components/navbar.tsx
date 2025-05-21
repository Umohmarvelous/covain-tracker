"use client"
import { CalendarDaysIcon, HomeIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react";

// import user from "../assets/images/user.png";
// const [active, setActive] = useState(false)


const Navbar = () => {
    const pathname = usePathname()

    // function activeClicks() {
    //     if (active === false) {
    //         setActive(true)
    //     } else setActive(false)


    // }

    // Array of Navigaion links
    const navLinks = [
        {
            name: "Dashboard",
            icon: HomeIcon,
            active: true,
            path: "/Dashboard",
        },
        {
            name: "Income",
            icon: DocumentTextIcon,
            active: false,
            path: "/Income"
        },
        {
            name: "Budget",
            icon: CalendarDaysIcon,
            active: false,
            path: "/Budget",
        },
    ];

    return (
        <div className="flex flex-col justify-between self-center h-full pr-7 gap-10 minH-auto w-45">
            <div className="p-10">
                <div className="rounded-full bg-[#c5edfd] flex items-center justify-center">
                    {/* <img src={} className="w-[60%] m-3" /> */}
                </div>
                <span className=""
                    style={{
                        color: 'black',
                    }}>
                    Pony App
                </span>
            </div>
            <nav className="gap-2 w-auto h-full flex flex-col items-start justify-center pt-25">
                {/* <div className="text-lg font-bold border-2 ">sdfghjkl</div> */}
                {navLinks.map((link, index) => {
                    const isActive = pathname === link.path

                    return (
                        <li key={index} className="navList p-2 flex items-start justify-start gap-0 text-gray-600 hover:bg-gray-200 cursor-pointer">

                            <Link
                                href={link.path}
                                className={`${isActive
                                    ? 'text-emerald-400 font-medium'
                                    : 'text-gray-400 hover:text-gray-600 flex flex-row items-center justify-center  gap-2'
                                    } transition-colors flex flex-row items-center justify-center gap-2`}>
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </nav>
            <div className="">
                <div className="mt-auto border-t border-gray-300 py-3">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="font-medium">Settings</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="font-medium">Help</span>
                    </a>
                </div>

                <div className="border-t border-gray-300 py-2 px-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Chris Flores" />
                            <AvatarFallback>CF</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Chris Flores</p>
                            <p className="text-xs text-gray-500 truncate">felicia.reid@exple.com</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;