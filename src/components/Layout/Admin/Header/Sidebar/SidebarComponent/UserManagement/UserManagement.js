import { useState, useRef, useEffect } from 'react';
import { Trash2, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../components/ui/select";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../../../../../lib/utils";
import React from 'react';
import Xicon from '../../../../../../../assets/Admin/logo/xicon.svg';
import EditIcon from '../../../../../../../assets/Admin/logo/edit.svg';
import DarkEditIcon from '../../../../../../../assets/Admin/logo/darkedit.svg';

import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Importing the theme context
import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";

const users = [
  { username: "User name", email: "user@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Public User", activity: "Today" },
  { username: "User name", email: "user@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Admin User", activity: "Yesterday" },
  { username: "User name", email: "ctive@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Admin User", activity: "2 days ago" },
  // ... add more users as needed
];

const CustomCheckbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-[#909090] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#036068] data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CustomCheckbox.displayName = 'CustomCheckbox';

export default function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const { isDarkMode } = useTheme(); // Access dark mode from theme context
  const [latestDate, setLatestDate] = useState(null);
  const {profiledetails} = useAuth()

  const toggleUserSelection = (index) => {
    setSelectedUsers(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSelectedUsers([]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(scrollPercentage);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/GetUsers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        if (result.success) {
          const newItems = result.data.map(user => {
            const loginTime = user.lastlogin;
            if (!loginTime) return { ...user, lastlogin: "User has not logged in yet." };

            const lastLoginDate = new Date(loginTime);
            const today = new Date();

            // Calculate the difference in milliseconds
            const diffTime = today - lastLoginDate;

            // Calculate time differences
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffMonths = Math.floor(diffDays / 30); // Approximate for simplicity
            const diffYears = Math.floor(diffDays / 365);
            let lastdateString;

            // Determine the output string
            if (diffYears > 0) {
              lastdateString = `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
            } else if (diffMonths > 0) {
              lastdateString = `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
            } else if (diffDays > 0) {
              lastdateString = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else {
              lastdateString = "Logged in today";
            }

            return { ...user, lastlogin: lastdateString };
          });

          setData(newItems);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [data]); 

  const handleFeedbackDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/deletemultipleusers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([id]),
      });
      const data = await response.json();
          if(data.success){
            console.log(data.message);
          }
          else{
            console.log(data.message);
          }
      
      } catch (error) {
          console.error('Error submitting form:', error);
      }
    //Update state to remove the deleted record
    setData(data.filter(record => record.id !== id));
  };

  const handleselectedDeleted = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/deletemultipleusers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedUsers),
      });
      const data = await response.json();
        if(data.success){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }
      
      } catch (error) {
          console.error('Error submitting form:', error);
      }
    //Update state to remove the deleted record
    //setData(data.filter(record => record.id !== id));
    setData(data.filter(record => !selectedUsers.includes(record.id)));
  };

  const handleUserRoleChange = async(userId, role) => {
    // Update user role logic here
    try {
      const userRoleObj ={
        id:userId,
        role:role
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/updateuserrole`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userRoleObj),
      });
      const data = await response.json();
        if(data.success){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }     
    }catch (error) {
      console.error('Error submitting form:', error);
    }  
};
  return (
    <div className="flex h-[calc(100vh-6rem)]">
 <div  className={`p-8 rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden ${
        isDarkMode ? "bg-[#303031] bg-opacity-90" : "bg-white "
      } text-black backdrop-blur border-none`}>
    <div className="flex justify-between items-center mb-6">
    <h2 className={`text-[22px] font-medium ${isDarkMode ? "text-[#FFFFFFCC]" : "text-gray-800"}`}>
    User Management</h2>
          <button 
            onClick={toggleEdit} 
            className={isEditing ? "text-gray-500 hover:text-gray-700" : "text-teal-600 hover:text-teal-700"} 
            aria-label={isEditing ? "Close edit mode" : "Edit"}
          >
            {isEditing ? (
              <img src={Xicon} alt="Edit" className="w-6 h-6" />
            ) : (
              <img 
              src={isDarkMode ? DarkEditIcon : EditIcon }
              alt="Edit" className="w-6 h-6" />
            )}
          </button>
        </div>

        <hr className={`border-t  my-4 ${isDarkMode ? "border-[#FFFFFF] border-opacity-10" : "border-gray-300"}`} />
        <div className="overflow-hidden flex-grow relative">
          <div ref={tableRef} className="overflow-x-auto overflow-y-auto absolute inset-0 pr-4">
            <table className="w-full">
            <thead className={`sticky top-0   z-10 ${isDarkMode ? "bg-[#303031] " : "bg-white"}`}>
            <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  {isEditing && <th className="pb-3 w-8"></th>}
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>Username</th>
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>Email Id</th>
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>Phone Number</th>
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>Country</th>
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>User Roles</th>
                  <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>User Activity</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={user.id} className={`${
                    isDarkMode
                      ? user.id % 2 === 0
                        ? "bg-transparent"
                        : "bg-white bg-opacity-10"
                      : user.id % 2 === 0
                      ? "bg-[#D5E5DE] bg-opacity-30"
                      : "bg-white"
                  }`} >

                    {isEditing && (
                      <td className="py-4 pl-2">
                        <CustomCheckbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </td>
                    )}
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{user.username}</td>
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{user.email}</td>
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{user.phoneNumber}</td>
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{user.country}</td>
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>

                      {isEditing ? (
                        <Select defaultValue={user.role} onValueChange={(value) => {
                          handleUserRoleChange(user.id, value);
                      }}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* <SelectItem value="Public User">Public User</SelectItem>
                            <SelectItem value="Admin User">Admin User</SelectItem>
                            <SelectItem value="Creator User">Creator User</SelectItem> */}
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="admin">admin</SelectItem>
                            {/* <SelectItem value="Creator User">Creator User</SelectItem> */}
                          </SelectContent>
                        </Select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>
                      {user.lastlogin}</td>
                    <td className="py-4">
                    <button className={` aria-label="Delete user" ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-red-500 hover:text-red-600"}`} onClick={() => handleFeedbackDelete(user.id)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isEditing && (
          <div className="mt-4">
            <button onClick={() => handleselectedDeleted()}
              className="bg-[#EDB3B3] text-[#870202] px-4 py-2 rounded-lg font-medium font-omnes text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedUsers.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
      <div className={`w-2 rounded-full mr-3 mt-12 mb-10 ml-2 relative ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-[rgba(96,96,96,0.8)]"
      } text-black backdrop-blur border-none`}>       
       <div 
          className="w-full bg-[#B2CACC] absolute rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${scrollPercentage}%`,
            top: '0',
          }}
        ></div>
      </div>
    </div>
  );
}
