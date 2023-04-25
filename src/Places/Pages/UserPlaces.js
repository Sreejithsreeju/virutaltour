import React, { useState, useEffect} from 'react'
import {useParams}  from 'react-router-dom'

import ErrorModal from '../../Shared/Components/UIElements/ErrorModal'
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner'
import PlaceList from '../Components/PlaceList'
import { useHttpClient } from '../../Shared/Hooks/http-hook'



// const PLACES =[ 
//   {
//     id:'p1',
//     title:'Palakkad Fort',
//     description:'Built by Hyder Ali',
//     image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Palakkad_Fort.JPG/800px-Palakkad_Fort.JPG',
//     address:'Kotta Maidanam, Palakkad',
//     creator:'u1',
//     location: {
//         lat:10.7637057,
//         lng:76.6549328
//     }       

// },

// {
//   id:'p2',
//   title:'Malampuzha Garden',
//   description:'Major Irrigation project in palakkad',
//   image:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/e0/95/9b/malampuzha-garden-and.jpg?w=1200&h=1200&s=1',
//   address:'Malampuzha, Palakkad',
//   creator:'u2',
//   location: {
//       lat:10.8419638,
//       lng:76.6471837
//   }       

// },

// {
// id:'p3',
// title:'Nelliyampathy',
// description:'Hill station in palakkad',
// image:'https://www.keralatourism.org/images/destination/large/nelliyampathy_hills_palakkad20131031111644_152_1.jpg',
// address:'Nelliyampathy, Palakkad',
// creator:'u2',
// location: {
//     lat:10.5346967,
//     lng:76.6860446
// }       

// }  
// ]


const UserPlaces = () => {

const [loadedPlaces, setLoadedPlaces] = useState()
  
let userId = useParams().uid;

const fetchUsers = async ()=>{
  try{
    const responseData =   await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
  setLoadedPlaces(responseData.places)
} catch(err){

}
}

const{isLoading, error, sendRequest, clearError} = useHttpClient()

useEffect( ()=>{
  fetchUsers()
  
},[sendRequest, userId])

const deletedPlaceHandler = (deletedPlaceId) => {
setLoadedPlaces( prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
}


//const loadedPlaces  = PLACES.filter(place => place.creator === userId);
   // console.log(loadedPlaces)
  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    { isLoading && <div className='center'>
      <LoadingSpinner />
      </div>}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete = {deletedPlaceHandler}/>}
    
    </>
  )
}

export default UserPlaces