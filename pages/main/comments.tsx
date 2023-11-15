// import { addDoc, collection} from "firebase/firestore";
// import { auth, db } from "../../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import {useForm} from "react-hook-form";


// interface Comments{
//     commentId: string;
//     userId: string;
//     comment: string;
// }


//     const AddComment = () =>{
//     const [user] = useAuthState(auth);



//     const {register, handleSubmit} = useForm<Comments>();

//     const commentsRef = collection(db, "comments");

//     const onAddComment = async (data: Comments) => {
//         await addDoc(commentsRef, {
//             ...data,
//             username: user?.displayName,
//             userId: user?.uid,
            
//         });

        
//     }

//     return(
//         <div className="comments">
//                 <form onSubmit={handleSubmit(onAddComment)}>
//                 <input placeholder="type your comment here" type="text" {...register("comment")} />
//                 <input type="submit" value="submit"/>

//                 </form>
//             </div>
//     )
// }


