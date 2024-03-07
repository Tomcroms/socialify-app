'use client';

import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/button";
import AuthSocialButton from '../../components/authSocialButton';
import { BsGithub, BsGoogle } from "react-icons/bs"
import Input from "@/app/components/Input";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const Auth = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push("/conversations")
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant == 'LOGIN'){
            setVariant('REGISTER');
        }
        else{
            setVariant('LOGIN');
        }
      }, [variant]);
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '', 
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(variant == 'REGISTER'){
            axios.post('/api/register', data)
            .then(() => signIn('credentials', {
                ...data,
                redirect: false,
            }))
            .then((callback) => {
                if (callback?.error) {
                toast.error('Invalid credentials!');
                }
        
                if (callback?.ok) {
                router.push('/conversations')
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
        }

        if(variant == 'LOGIN'){
            signIn("credentials", {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error("Invalid credentials");
                }
                else if(callback?.ok){
                    toast.success("Logged in");
                    router.push("/conversations");
                }

            })
            .finally(() => setIsLoading(false));
        }
    }


    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials');
            }
            else if(callback?.ok){
                toast.success('Logged in!');
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <section className='w-full'>
            <div className='w-3/4 m-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">   
                    {variant == 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
                    )}
                    <Input id="email" label="Email address" register={register} errors={errors} disabled={isLoading}/>
                    <Input id="password" label="Password" register={register} errors={errors} disabled={isLoading}/>
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant == "LOGIN" ? "Sign in" : "REGISTER"}
                        </Button>
                    </div>
                </form>
            </div>
            <div className='mt-2 w-3/4 mx-auto'>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center"></div>
                    <div className="w-full border-t border-gray-300"></div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <p>
                        {variant == "LOGIN" ? "New to socialify?" : "Already have an account?"}
                    </p>
                    <p className="underline cursor-pointer" onClick={toggleVariant}>
                        {variant == "LOGIN" ? "Create an account" : "Login"}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Auth;