import {getDocs, collection} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useState} from "react";
import {useEffect} from "react";
import { Post } from "./post";

export interface Post {
    id: string;
    userID: string;
    title: string;
    description: string;
    username: string;

}


export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null >(null);
    const postsRef = collection(db, "posts");



    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }


    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div>
            {postsList?.map((post) => (
                <Post post={post}/>
            ))}
        </div>
    )
}

export default Main;