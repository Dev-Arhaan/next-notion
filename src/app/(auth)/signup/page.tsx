'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Logo from '../../../../public/CypressLogo.svg';
import Loader from '@/components/loader';

const SignUpFormSchema = z.object({
    email: z.string().describe("Email").email({message:"Invalid Email"}),
    password: z
    .string()
    .describe("Password")
    .min(6, 'Password must be minimum 6 characfters'),
    confirmPassword: z
    .string()
    .describe("Confirm Password")
    .min(6, 'Password must match'),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword']
});

const Signup = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [submitError, setSubmitError] = useState('');
    const [confirmation, setConfirmation] = useState(false);

    const codeExchangeError = useMemo(() => {
        if(!searchParams) return '';
        return searchParams.get('error_decription');
    }, [searchParams]);

    const confirmationAndErrorStyles = useMemo(() => clsx('bg-primary',{
        "bg-red-500/10":codeExchangeError,
        "bg-red-500/50":codeExchangeError,
        "bg-red-700":codeExchangeError
    }), 
    []
);


    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {email: '', password: '', confirmPassword: ''}, 
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = () => {
        
    };
  return (
    <Form {...form}>
      <form 
      onChange={() => {
        if(submitError) setSubmitError('');
      }}
      onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col">
        <Link href='/'
        className='w-full flex justify-left items-center
        '>
          <Image src={Logo} 
          alt='cypress logo' 
          width={50}
          height={50}
          />
          <span className='fonr-semibold dark:text-white text-4xl first-letter:ml-2'>Cypress.</span>
          
        </Link>

        <FormDescription className='text-foreground/60'>
        An all-In-One Collaboration and Productivity Platform
        </FormDescription>

        {!confirmation && !codeExchangeError && (
            <>
                        <FormField
        disabled={isLoading}
        control={form.control}
        name="email"
        render={
          (field) => {return (
          <FormItem>
            <FormControl>
              <Input type="email"
                placeholder='Email'
                {...field} />
            </FormControl>
          </FormItem>
        );
        }}>
          
        </FormField>

        <FormField
        disabled={isLoading}
        control={form.control}
        name="password"
        render={(field) => {return (
          <FormItem>
            <FormControl>
              <Input type="password"
                placeholder='Password'
                {...field} />
            </FormControl>
          </FormItem>
        );}}>
          
        </FormField>

        <FormField
        disabled={isLoading}
        control={form.control}
        name="confirmPassword"
        render={(field) => {return (
          <FormItem>
            <FormControl>
              <Input type="password"
                placeholder='Confirm Password'
                {...field} />
            </FormControl>
          </FormItem>
        );}}>
          
        </FormField>


                <Button type="submit"
                className='w-full p-6'
                disabled={isLoading}>
                    {!isLoading ? 'Create Account' : <Loader />}
                </Button>
            </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}


        <span className="self-container">
            Already have an account?{' '}
            <Link href="/login"
            className='text-primary'>
              Log In
            </Link>
        </span>
      </form>
    </Form>
  );
}

export default Signup;