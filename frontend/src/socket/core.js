import io from "socket.io-client";
import { BACKEND_ORIGIN } from "../utils/constants";

export async function connect () {
    
    const socket = await io.connect(BACKEND_ORIGIN,{
        
    })

    return socket;
}