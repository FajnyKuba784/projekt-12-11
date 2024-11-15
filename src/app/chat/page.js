"use client"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';


export default function Chat() {


    const pb = new PocketBase('http://172.16.15.136:8080');

    const [dane, setDane] = useState(null)
    const [msg, setMsg] = useState(null)
    const userID = "k6l6cgudjrfrivk"

    useEffect(() => {

        const getData = async () => {

            try {

                const resultList = await pb.collection('chat').getList(1, 50, {
                    sort: '-created',
                });
                setDane(resultList.items)
                console.log(resultList.items)
            } catch (err) {
                console.log(err)
            }

        }
        getData()



    }, [])


    useEffect(() => {
        // Subscribe to changes in any chat record
        pb.collection('chat').subscribe('*', function (e) {

            if (e.action == "create") {

                setDane((prev) => [...prev, e.record])
                console.log(e.action);
                console.log(e.record);
            }

        });
        return () => {
            pb.collection('chat').unsubscribe();
        }
    }, [])


    const handleInput = (e)=>{

        setMsg(e.target.value)


    }
    const handleSend = async ()=>{

        const data = {
            user_id : userID,
            message : msg
        }

        const record = await pb.collection('chat').create(data);

    }

    const getClassName = (id)=>{
        
        if(id==userID){
            const classname = "flex justify-end"
            return classname
        }
        else if(id!==userID){
            const classname2 = "flex justify-start"
            return classname2
        }


    }

    return (
        <div className='flex flex-col justify-center items-center'>



            <Card className="w-[50%] h-[50vh]">

            {dane && dane.map((wiadomosc) => (

              
                <div key={wiadomosc.id} className={getClassName(wiadomosc.user_id)}>
                    <Card className="w-[50%]">
                    <p >{wiadomosc.message}</p>
                    </Card>
                </div>


            ))}
            </Card>

            <div className='flex mt-5 w-[50%] gap-2'>
                <Input onChange={(e)=>{handleInput(e)}}>
                </Input>
                <Button onClick={handleSend}>
                    <Send></Send>
                </Button>
            </div>


        </div>
    )


}
