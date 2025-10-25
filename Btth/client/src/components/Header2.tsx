import { Dropdown, Menu, Select} from "antd";
import { Link } from "react-router-dom";
// import { debounce } from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import vieIcon from "../assets/vieIcon.webp"
import JapIcon from "../assets/japIcon.jpg"
import { useAppSelector } from "../hooks/Hook";
import {useState} from "react";
import Avatar from "../assets/Avatar.svg";

interface HeaderProps {
    onLogout: () => void;
    // onSearch?: (text: string) => void;
}

const Header = ({ onLogout }: HeaderProps) => {
    const [open, setOpen] = useState(false);

    const { currentUser } = useAppSelector((state) => state.user);




    const [selectedStudy, setSelectedStudy] = useState('home');

    const handleSelect = (value: string) => {
        setSelectedStudy(value);
    };

    const languageMenu = (
        <Menu>
            <Menu.Item key="vn">
                <div className="flex items-center gap-2">
                    <img src={vieIcon} alt="Vietnam Flag" className="w-6 h-6 rounded-full" />
                    Vietnam
                </div>
            </Menu.Item>
            <Menu.Item key="jp">
                <div className="flex items-center gap-2">
                    <img src={JapIcon} alt="Japan Flag" className="w-6 h-6 rounded-full" />
                    Japanese
                </div>
            </Menu.Item>
        </Menu>
    );

    const userMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center gap-4">
                    {/*<Avatar*/}





                    {/*   */}
                    {/*/>*/}
                    <img
                        src={currentUser?.avatar || Avatar}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        // src="/assets/avatar.svg"
                        // size={40}
                        // icon={<FontAwesomeIcon icon={faUser} />}
                    >
                    </img>
                    <div>
                        {/*CHO NAY CAN CHECK LAI currentUser?.fullName*/}
                        <h3 className="text-base font-semibold text-gray-800">{currentUser?.fullName}</h3>
                        <span className="text-sm text-gray-500">{currentUser?.email}</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="info">
                <Link to="/profilePage" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                    Thông Tin
                </Link>
            </Menu.Item>
            <Menu.Item key="signout">
                <span onClick={onLogout} className="text-red-500 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex items-center justify-between px-3 py-3.5  bg-[#E5E7EB] font-sans">
            {/*<div id="logoHome">*/}
            {/*    <img src="/assets/Group 1.svg" alt="Logo" className="h-10" />*/}
            {/*</div>*/}
            <Link to="/dashboard" className="text-xl md:text-2xl font-bold text-gray-700">UniLife Hub</Link>

            {/*<div className="flex-1 max-w-xs md:max-w-sm lg:max-w-md mx-4 hidden sm:block">*/}
            {/*    <Input*/}
            {/*        value={search}*/}
            {/*        onChange={handleChange}*/}
            {/*        placeholder="Search for test"*/}
            {/*        className="rounded-md"*/}
            {/*    />*/}
            {/*</div>*/}

            <nav className="hidden md:flex">

                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4 text-gray-800 font-semibold">
                        <Link to="/quizTest/:id" className="cursor-pointer hover:text-gray-600" id="testPage">
                          Ôn luyện mỗi ngày
                        </Link>
                        <Link to="/dashboard" className="cursor-pointer hover:text-gray-600">Home</Link>
                        <div className="cursor-pointer hover:!text-gray-600">
                            <Select
                                value={selectedStudy}
                                onChange={handleSelect}
                                bordered={false}
                                suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
                                // dropdownStyle={{ minWidth: 120 }}
                            >
                                <Select.Option value="home">Học tập</Select.Option>
                                {/*<Select.Option value="search">Tra cứu</Select.Option>*/}
                            </Select>
                        </div>
                        <Dropdown overlay={languageMenu} trigger={['hover']}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src={vieIcon} alt="Vietnam Flag" className="w-6 h-6 rounded-full" />
                                <span className="text-gray-800 font-semibold">VI</span>
                            </div>
                        </Dropdown>
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            {/*<Avatar*/}
                            {/*    size={40}*/}
                            {/*    icon={<FontAwesomeIcon icon={faUser} />}*/}
                            {/*    className="cursor-pointer"*/}
                            {/*/>*/}
                            {/*<div*/}
                            {/*    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400  cursor-pointer hover:bg-gray-400 transition"*/}
                            {/*>*/}
                            {/*    /!*<FontAwesomeIcon icon={faUser} className="text-lg" />*!/*/}
                            {/*    /!*<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>*!/*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="30px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T480-440q67 0 131.5 16T736-378q30 15 47 43.5t17 62.5v112H160Zm320-400q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm160 228v92h80v-32q0-11-5-20t-15-14q-14-8-29.5-14.5T640-332Zm-240-21v53h160v-53q-20-4-40-5.5t-40-1.5q-20 0-40 1.5t-40 5.5ZM240-240h80v-92q-15 5-30.5 11.5T260-306q-10 5-15 14t-5 20v32Zm400 0H320h320ZM480-640Z"/></svg>*/}
                            {/*</div>*/}
                            <img
                                src={currentUser?.avatar || Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                        </Dropdown>

                    </div>
                    {/*<div className="flex items-center">*/}

                    {/*    */}
                    {/*</div>*/}
                </div>
            </nav>

            <button onClick={() => setOpen(!open)} className=" cursor-pointer md:hidden flex w-[44px] h-[36px] justify-center items-center rounded border !border-gray-400 bg-gray-200  hover:!bg-gray-100 active:!bg-gray-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 18" fill="none"><path d="M1 1H23M1 9H23M1 17H23" stroke="black" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>

            {open && (
                <div className="flex flex-col gap-2       absolute z-50 top-14 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:hidden">
                    {/*<ul className="flex flex-col gap-2">*/}
                    {/*<li>*/}
                    <Link to="/dashboard" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded" onClick={() => setOpen(false)}>
                        Home
                    </Link>
                    {/*</li>*/}
                    {/*<Link to="/profilePage" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">*/}
                    {/*    Thông Tin*/}
                    {/*</Link>*/}
                    {/*<li>*/}
                    <Link to="/profilePage" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                        Thông Tin
                    </Link>
                    <Link to="/quizTest/:id"                 className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded"
                          id="testPage" onClick={() => setOpen(false)}>
                        Thi thử mỗi ngày
                    </Link>
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <span className="text-gray-800 hover:text-gray-600 block py-1" id="topicPage" onClick={() => setOpen(false)}>*/}
                    {/*        Chủ đề*/}
                    {/*    </span>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<div className="flex items-center text-orange-500 font-semibold">*/}
                    {/*    <Select*/}
                    {/*        value={selectedStudy}*/}
                    {/*        onChange={handleSelect}*/}
                    {/*        bordered={false}*/}
                    {/*        // suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}*/}
                    {/*        className="text-orange-500 font-semibold w-full"*/}
                    {/*        // dropdownStyle={{ minWidth: 120 }}*/}
                    {/*    >*/}
                    {/*        <Select.Option value="home">Học tập</Select.Option>*/}
                    {/*        <Select.Option value="search">Tra cứu</Select.Option>*/}
                    {/*    </Select>*/}
                    {/*</div>*/}
                    {/*<Link to="/dashboard" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded" onClick={() => setOpen(false)}>*/}
                    {/*    Tra cứu*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<Link to="/dashboard" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded" onClick={() => setOpen(false)}>*/}
                    {/*    Học tập*/}
                    {/*</Link>*/}

                    {/*<li>*/}
                    {/*    <Dropdown overlay={languageMenu} trigger={['hover']}>*/}
                    {/*        <div className="flex items-center gap-2 cursor-pointer py-1">*/}
                    {/*            <img src={vieIcon} alt="Vietnam Flag" className="w-6 h-6 rounded-full" />*/}
                    {/*            <span className="text-gray-800 font-semibold">VI</span>*/}
                    {/*        </div>*/}
                    {/*    </Dropdown>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    <Link
                        to="/login"
                        onClick={() => {
                            onLogout();
                            setOpen(false);
                        }}
                        className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded"
                    >
                        Log out
                    </Link>
                    {/*</li>*/}
                    {/*</ul>*/}
                </div>
            )}
        </div>
        // <header className="bg-gray-800 text-white h-14 flex items-center justify-between px-4 relative">
        // </header>
    );
};

export default Header;