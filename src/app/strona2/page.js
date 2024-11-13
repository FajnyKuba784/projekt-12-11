"use client"
import PocketBase from 'pocketbase';
import { baseUrl } from '@/lib/constans';
import { useEffect, useState } from 'react';
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';


export default function Home() {

  
  const [date,setDate] = useState(null)
  const pb = new PocketBase(baseUrl);
  pb.autoCancellation(false);
  const [data,setData] = useState(pb.authStore.model)
  const [text,setText] = useState(null)
  const [tytul,setTytul]= useState(null)
  const handleUsun = async (id)=>{

    await pb.collection('posty').delete(id);

    setDate((prev)=>prev.filter((item)=>item.id!==id))

  } 

  const handleEdit = async (id)=>{

    const data = {
      "tytul": tytul,
      "text": text
  };

    console.log(data)
    console.log(id)
    const record = await pb.collection('posty').update(id, data);
    setDate((prev) =>
                prev.map((gra) => (gra.id === id ? record : gra))
            );

  }


  useEffect(()=>{
    const getData= async ()=>{
      try{

        const records = await pb.collection('posty').getFullList({
          sort: '-created',
        });
        console.log(records)
        setDate(records)
      }
      catch(err){
        console.log(err)
      }
      
      
    }
    getData()
  },[])
if(!date){
  return(<h1>chuj ci w dupe</h1>)
}


  return (
    <>
    {data?(
      <div>

      {date && date.map((post)=>(

      
        
         <div key={post.id}>

        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>{post.tytul}</CardTitle>
            <CardDescription>{post.text}</CardDescription>
          </CardHeader>
          <CardFooter>
            {data.username === post.user ? (
                <div className=" flex flex-row gap-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button >
                        Edycja
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Zmiana postu</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                          <div className='flex flex-col gap-3'>

                          <Input defaultValue={post.tytul} onChange={(e)=>{setTytul(e.target.value)}}>

                          </Input>
                          <Input defaultValue={post.text} onChange={(e)=>{setText(e.target.value)}}>
                          
                          </Input>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button>Anuluj</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild> 
                        <Button onClick={()=>{handleEdit(post.id)}}>
                       Zmień
                      </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>



                  <Button onClick={()=>{{handleUsun(post.id)}}}>
                    Usuń
                  </Button>
                </div>)
              
            :(
                "nie gyatujesz"
              )}
          </CardFooter>
        </Card>

         </div> 


      ))}



      </div>
    ):(
      <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      <Button variant='outline' onClick={()=>{window.location.href='/logowanie'}} className='ml-2'>Login</Button>
      </AlertDescription>
    </Alert>
    )}
    </>
  );
}