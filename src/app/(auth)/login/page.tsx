'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormDescription, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../public/CypressLogo.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';
import { actionLoginuser } from '@/lib/server-actions/auth-actions';



const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
      defaultValues: { email: '', password: ''},
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit:SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {
      const {error} = await actionLoginuser(formData);
        if(error){
          form.reset();
          setSubmitError(error.message);
        }
        router.replace('/dashboard')

    }


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

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <Button
        type="submit"
        className='w-full p-6'
        size={"lg"}
        disabled={isLoading}>
          {!isLoading ? 'Login' : <Loader />}
        </Button>

        <span className="self-container">
            Don't have an account?{' '}
            <Link href="/signup"
            className='text-primary'>
              Sign Up
            </Link>
        </span>
      </form>
    </Form>
  )
}

export default LoginPage