'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log('Login data:', data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Login error:', error.message);
    // You can also log the entire error object for more details
    console.error('Full error:', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
