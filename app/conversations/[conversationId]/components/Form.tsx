"use client";


import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { CldUploadButton } from "next-cloudinary";
import MessageInput from "./MessageInput";
import axios from "axios";

const Form = () => {
    const { conversationId } = useConversation();  //lit l'url pour récupérer convId
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: {
        errors,
      }
    } = useForm<FieldValues>({
      defaultValues: {
        message: ''
      }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
          ...data,
          conversationId: conversationId
        })
    }



    return ( 
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput 
                    id="message" 
                    register={register} 
                    errors={errors} 
                    required  
                    placeholder="Write a message"
                />
                <button 
                    type="submit" 
                    className="
                        rounded-full 
                        p-2 
                        bg-sky-500 
                        cursor-pointer 
                        hover:bg-sky-600 
                        transition
                    "
                >
                    <HiPaperAirplane
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    );

}

export default Form;