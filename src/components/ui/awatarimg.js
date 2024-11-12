
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";


export default function Awatar() {





    return (


        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" height="100px" width="100px" className='rounded-md' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href="/logowanie">Logowanie</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/wyloguj">Wyloguj</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/ustawienia">Ustawienia</Link>
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )




}