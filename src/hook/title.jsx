import { useAtom } from "jotai";
import { useEffect } from 'react';

import titleState from "../state/title";

const useTitle = (title)=>{

    const [title,setTitle] = useAtom(titleState);

    useEffect(()=>{setTitle(title)},[setTitle,title]);

}

export default useTitle;