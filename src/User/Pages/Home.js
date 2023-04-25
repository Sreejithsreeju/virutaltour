import React,{ useEffect, useState} from "react";
import UserList from "./UserList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import {useHttpClient} from "../../Shared/Hooks/http-hook"


const Home = () => {

  // const[isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()
  const[loadedUsers, setLoadedUsers] = useState()
  const{isLoading, error, sendRequest,clearError}=useHttpClient()


  // const Items = [
  //   {
  //     id : 'u1',
  //     name : 'James Alexander',
  //     image : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     places : 3
  //   }
  // ]

  // return(
  //   <UserList items={Items} />
  // )
  // }
  




  useEffect( () => {
    const fetchUsers = async () => {
      //setIsLoading(true);
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');

      

    
        setLoadedUsers(responseData.user);
        console.log(responseData.user)
      } catch (err) {
        // setError(err.message);
      }
      //setIsLoading(false);
    };
    fetchUsers();
  }, [sendRequest]);


  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
      
   </>
 );
};

export default Home;