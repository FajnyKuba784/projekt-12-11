"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import PocketBase from 'pocketbase';


export default function Zmiana(){
    const pb = new PocketBase('http://172.16.15.136:8080');
    const [model, setModel] = useState(pb.authStore.model)
    const [zdj,setZdj] = useState(null)

    const zdjecie = (e)=>{
        setZdj(e.target.files[0])
    }
    const zmiana = async ()=>{
        const data = {
            "avatar": zdj,
        };


        const record = await pb.collection('users').update(model.id, data);
        window.location.reload()
    }

    return(
        <div className="flex justify-center items-center">
            <h1>Ustawienia</h1>


            <Input type="file"  onChange={(e)=>{zdjecie(e)}}></Input>
            <Button onClick={zmiana}>Zmień</Button>

        </div>

    )




}