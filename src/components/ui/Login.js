"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PocketBase from 'pocketbase';
import {baseUrl} from '@/lib/constants'
const pb = new PocketBase(baseUrl);
import {useState,useEffect} from "react"
export default function Login(){
    console.log(baseUrl)
    const [inputs, setInputs] = useState({login:null,password:null})
    const handleLogin = async ()=>{
        try{
            const authData = await pb.collection('users').authWithPassword(
                inputs.login,
                inputs.password,
            );
            window.location.href='/'
        }
        catch(err){
            console.log(err)
        }
    }
    const handleInput = (e,target)=>{
        setInputs((prev)=>({...prev,[target]:e.target.value}))
    }
    return(
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login">Login</Label>
              <Input id="login" placeholder="login" onChange={(e)=>{handleInput(e,"login")}}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" placeholder="Password..." onChange={(e)=>{handleInput(e,"password")}}/>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
    )
}