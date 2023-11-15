import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore" 
import {db, auth} from "../../config/firebase";
import {useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";



interface CreateFormData {
    title: string;
    description: string;
}



export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
    });


    const { register, handleSubmit } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "posts");


    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            
        });

        navigate("/");
        
    }



    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder="Title..." type="text" {...register("title")}/>  
                <input placeholder="Description..." type="text" {...register("description")} />  
                <input type="submit" /> 

            </form>
        </div>
    )
}
    