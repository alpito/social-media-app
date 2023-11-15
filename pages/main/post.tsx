import { addDoc, getDocs, collection, query, where, deleteDoc, doc} from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useState} from "react";
import { useEffect } from "react";
import {useForm} from "react-hook-form";



interface Props{
    post: IPost;
}


interface Like {
    likeId: string;
    userId: string;

}

interface Comments{
    comment: string;
}



export const Post = (props: Props) => {


    const {post} = props;

    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null >(null); 
    
    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const [comments, setComments] = useState<Comments[] | null >(null);

    const commentsRef = collection(db, "comments");

    const commentsDoc = query(commentsRef, where("postId", "==", post.id));

 

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id })) as Like[]);
    }

    const addLike = async () => {
        const newDoc = await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id,
        });
        if (user){
        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id  } ] : [{userId: user?.uid, likeId: newDoc.id } ]);
        }  
    }

    const removeLike = async () => {

        const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
        setLikes((prev) => prev?.filter((like) => like.likeId !== likeId) || null);

    }


    const hasUserClicked = likes?.find((like) => like.userId === user?.uid);



    const getComments = async () => {
        const data = await getDocs(commentsDoc);
        setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, comment: doc.data().comment })) as Comments[]);
    }
    
    const AddComment = () =>{
        const [user] = useAuthState(auth);
    
        const {register, handleSubmit} = useForm<Comments>();
    
        
            const onAddComment = async (data: Comments) => {
            await addDoc(commentsRef, {
                ...data,
                username: user?.displayName,
                userId: user?.uid,
                
            });

            if (user){
                setComments((prev) => prev ? [...prev, {comment: data.comment } ] : [{comment: data.comment } ]);
                }
    
            
        }
    
        return(
            <div className="comments">
                    <form onSubmit={handleSubmit(onAddComment)}>
                    <input placeholder="type your comment here" type="text" {...register("comment")} />
                    <input type="submit" value="submit"/>
    
                    </form>
                </div>
        )

       
    }


   


    useEffect (() => {
        getLikes();
    }, []);

    

    useEffect (() => {
        getComments();
    }, []);



    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>

            </div>
            
            <div className="body">
                <p>{post.description}</p>
            </div>

            <div>
                {AddComment()}
                {comments?.map((comment) => (
                    <div className="comment">
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>


            <div className="footer">
                <p>By: {post.username}</p>
                <button onClick={hasUserClicked ? removeLike : addLike}> {hasUserClicked ? <>Dislike</>  : <>Like</>  } </button>
                {likes && <p>{likes?.length}</p>}
            </div>
            
        </div>
    )
}

