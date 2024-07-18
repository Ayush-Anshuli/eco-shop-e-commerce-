import React, { useEffect, useState } from "react";

const useOnline = () => {
    const [online,setonline]  = useState(true);
    useEffect(() => {
            window.addEventListener('online', () => {
                setonline(true);
            })
            window.addEventListener('offline',()=>{
                setonline(false);
            })

            // return () => {
            //     window.removeEventListener('online' , () => (setonline(true)))
            //     window.removeEventListener('offline' , () => (setonline(false)))
            // }
    },[])
    return online;
}

export default useOnline;