import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)
  const [attendanceLoading,setAttendanceLoading]=useState(false);
  const [attendanceError,setAttendanceError]=useState(false);
  const [attendanceSuccess, setAttendanceSuccess] = useState("");
  
  const [records,setRecords]=useState([])
  const [recordsLoading,setRecordsLoading]=useState(false)
  const [recordsError,setRecordsError]=useState(false)

  const handleAttendance = async () => {
    try {
      setAttendanceLoading(true)
      setAttendanceError(false)
      const res = await fetch(`/api/user/attendance/${currentUser._id}`);
      const data =await res.json();
      console.log(data);
      
      if(data.status===400) {
        setAttendanceSuccess(data.message);
        return ;
      }
      if (data.success === false) {
        setAttendanceError(data.message)
        setAttendanceSuccess(false)
        return;
      }
      setAttendanceLoading(false);
      setAttendanceSuccess(data.message)
      
      
    } catch (error) {
      setAttendanceError(error.message)
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart);
      const res = await fetch("/api/auth/signout")
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleRecords=async()=>{
try{
setRecordsLoading(true)
setRecordsError(false)
      const res = await fetch(`/api/user/records/${currentUser._id}`);
      const data=await res.json()
      if(data.success===false){
        setRecordsError(data.message);
        setRecords([])
      }
      setRecords(data);
      console.log(records);
      setRecordsLoading(false)
      setRecordsError(false)

}catch(error){
setRecordsError(error.message)
setRecordsLoading(false)

}
  }
  // const handlePresentedStudentsClick = async () => {
  //   try {
  //     setPresentedStudentsLoading(true);
  //     setPresentedStudentsError("");
  //     const res = await fetch(`/api/user/records`);
  //     const data = await res.json();
  //     if (data.success) {
  //       setPresentedStudents(data.students);
  //     } else {
  //       setPresentedStudents([]);
  //       setPresentedStudentsError(data.message || "Failed to fetch presented students");
  //     }
  //     setPresentedStudentsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching presented students:", error);
  //     setPresentedStudents([]);
  //     setPresentedStudentsError("Failed to fetch presented students");
  //     setPresentedStudentsLoading(false);
  //   }
  // };
  return (
    <div className='p-3 max-w-lg mx-auto flex flex-col gap-5 '>
      <h1 className='text-3xl font-semibold my-7 text-center capitalize '>Mark your attendance:</h1>
      <button className='bg-slate-700 w-full text-white p-3 rounded-lg 
      uppercase items-center hover:opacity-95 disabled:opacity-80 '
        onClick={handleAttendance}
        disabled={attendanceLoading}
      >
        {attendanceLoading ?"Marking the attendance" :"Click here"}
      </button>
     <p className='text-green-700'>{attendanceSuccess}</p>
      {attendanceError && <p className='text-red-700'>Error :{attendanceError}</p>}


      
      <button className='bg-slate-700 w-full text-white p-3 rounded-lg 
      uppercase items-center hover:opacity-95 disabled:opacity-80 '
        onClick={handleRecords}
        disabled={recordsLoading}
      >
        {recordsLoading ?"Loading...." :"Presented students"}
      </button>
      {recordsError && <p className='text-red-700'>Error: {recordsError}</p>}
      {records.length > 0 &&
        <div className="mt-5 mx-auto">
          <h2 className="text-xl font-semibold mb-3">Presented Students:</h2>
          <ul className='flex flex-col items-center'>
            {records.map((record, index) => (
              <li key={index}>{record.userName}</li>
            ))}
          </ul>
        </div>
      }
      <span className='text-red-700 cursor-pointer font-serif'
        onClick={handleSignOut} >
        Sign Out
      </span>
    </div>
  )
}

export default Profile


