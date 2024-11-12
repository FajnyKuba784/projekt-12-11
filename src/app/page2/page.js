"use client"
import PocketBase from 'pocketbase';
import {baseUrl} from '@/lib/constants'
import { useState } from 'react';
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
const pb = new PocketBase(baseUrl);
export default function Home() {
  const [data,setData] = useState(pb.authStore.model)
  return (
    <>
    {data?(
      <div>
        <h1>Admin Panel czy cos</h1>
      </div>
    ):(
      <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      <Button variant='outline' onClick={()=>{window.location.href='/loginForm'}} className='ml-2'>Login</Button>
      </AlertDescription>
    </Alert>
    )}
    </>
  );
}