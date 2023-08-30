import { useEffect, useState } from "react";
import avatar from '../assets/basedProfile.png'
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { Link } from 'react-router-dom'

// Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const PostCard = (postData) => {
    const [post, setPost] = useState(postData);
    const [showEmojis, setShowEmojis] = useState(false)
    const [commentText, setCommentText] = useState('')

    const user = useSelector(state => state.user.user)

    const author = post.postData.author;
    const postDate = post.postData.date;
    const postContent = post.postData.content;
    const user_id = post.postData.user_id;

    const addEmoji = (e) => {
        const sym = e.unified.split("_")
        const codeArray = []
        sym.forEach((el) => codeArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codeArray)
        setCommentText(commentText + emoji)
    }


    const calculateTimeDifference = (timePost) => {
        const startDate = new Date(timePost);
        const curretTime = new Date();
        const difference = curretTime.getTime() - startDate.getTime();
    
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        var timeDiff = ''

        if(days === -1){
            timeDiff = 'Just now';
        }
        
        if(days !== 0){
            

            if(days === 1){
                timeDiff = days + '1 day ago'
            }
            else{
                timeDiff = days + ' days ago'
            }
        }

        else if(hours !== 0){
            if(hours === 1){
                timeDiff = hours + '1 hour ago'
            }
            else{
                timeDiff = hours + ' hrs ago'
            }
        }

        else if(minutes !== 0){
            if(minutes === 1){
                timeDiff = minutes + ' min ago'
            }
            else{
                timeDiff = minutes + ' mins ago'
            }
        }

        else if(seconds !== '0'){
            if(seconds === 1){
                timeDiff = seconds + ' sec ago'
            }
            else{
                timeDiff = seconds + ' secs ago'
            }
        }

        return timeDiff;

    }

    const current_time = post.postData.created_at
    const timeDiff = calculateTimeDifference(current_time);

    return (
        <div className="post-card">
            <div className="post-card-header">
                <img className="avatar" src={avatar} alt="" />
                <span className="spanAuthor"><Link to={'/profile/' + user_id}><h4 className="post-author">{author}</h4></Link><p>{timeDiff}</p></span>
                <a className="optionsBtn" href=""><i className="fa-solid fa-ellipsis"></i></a>
            </div>
            <div className="post-card-body">
                <div className="post-card-body-inner">
                    <p>{postContent}</p>
                </div>
                <div className="reactions">
                    <div className="likes">
                        <i class="fa-regular fa-heart"></i><p className="nLikes">150</p>
                    </div>
                    <div className="comments">
                        <i class="fa-regular fa-comment"></i><p className="nComments">23</p>
                    </div>
                </div>
                <div className="comment-field">
                    <textarea value={commentText} onChange={(e) => {setCommentText(e.target.value)}} className="commentsIconPicker" type="text" />
                    <div className="btn-comment">
                        <button onClick={() => {setShowEmojis(!showEmojis)}} className="extra-content-btn"><i class="fa-solid fa-face-smile"></i></button>
                        <button className="postCommentBtn"><i class="fa-solid fa-paper-plane"></i>Post</button>
                    </div>
                    {showEmojis && <div className="emojiPicker">
                        <Picker data={data} emojiSize={18} emojiButtonSize={28} onEmojiSelect={addEmoji} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PostCard;