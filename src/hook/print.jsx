import { useTheme } from "@mui/material";
import { useAtom } from "jotai";

import useColorModeContent from './colormode';
import printModalState from '../state/printmodal';

const usePrint = (printNode)=>{
    const theme = useTheme();
    const colorMode = useColorModeContent();
    const setPrintModalOpen = useAtom(printModalState);

    const printContent=useAtom({
        onBeforePrint: ()=>{
            if (theme.palette.mode==='dark'){
                colorMode.toggleColorMode();
            }
            setPrintModalOpen(false);
        },
        content: ()=> printNode,
        removeAfterPrint: true,
    });

    return ()=>{
        setPrintModalOpen(true);

        if (theme.palette.mode==='dark'){
            colorMode.toggleColorMode();
            setTimeout(printContent,500);
        }else{
            printContent();
        }
    }
}

export default usePrint;