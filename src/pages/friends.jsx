///////////////////////////////////////
// Friends Page (For all Users)
///////////////////////////////////////

// importing Navbar
import Navbar from '../components/Navbar'

// media
import based_profileImg from '../assets/basedProfile.png'


// import all libraries
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { supabase } from '../lib/supabaseClient'

// About Page Template
function Friends() {
    const { profile_id } = useParams()
    const logged_user = useSelector(state => state.user.user)

    let isLoggedUser = false
    if(profile_id === logged_user.id){
        isLoggedUser = true
    }

    // UseStates
    const [ friends, setFriends ] = useState(null)


    // Get All Friends of the Current User
    const getAllFriends = async (current_user_id) => {
        try {
            const {data, error} = await supabase.from('users_data').select()

            if(error){
                console.log(error);
            }

            if(data){
                console.log(data);
                // Look for the User's Row on database
                for(let i=0; i<data.length; i++){
                    if(current_user_id === data[i].user_id){
                        // assigning friends list to current state of friends
                        let friends = data[i].friends
                        // Extract the metadata from all the friends
                        var friendList = []
                        for(var j=0; j<friends.length; j++){
                            // Loop through the friends list and get the metadata from All Users List
                            for(var x=0; x<data.length; x++){
                                if(friends[j] === data[x].user_id){
                                    // Pushing Metadata into Friendlist Array
                                    friendList.push(data[x])
                                }
                            }
                        }
                        setFriends(friendList)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        // get all friends of a user
        getAllFriends(profile_id)
    
    }, [])

    return (
        <>
            <Navbar />
            <div className="friends">
                <div className="container">
                    {/* header */}
                    <div className="header">
                        <i className="fa-solid fa-user-group"></i>
                        <h1>Friends</h1>
                    </div>
                    {/* body */}
                    <div className="body">
                        <div className="friend-card">
                            <img src={based_profileImg} alt="" />
                            <div className="friend-info">
                                <p className='fullName'>Mark Zuckerberg</p>
                                <p className='username'>@markzuck</p>
                            </div>
                            <div className="friends-btns">
                                <button className='deleteBtn'><i className="fa-solid fa-user-xmark"></i>Delete Friend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Friends;