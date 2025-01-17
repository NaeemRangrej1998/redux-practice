import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import OpenDailog from "./OpenDailog";
export const DailogPractice = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle=()=> {
        console.log("Calls")
        setIsOpen(true)
    }

    const handleClose=()=>{
        setIsOpen(false)
    }

    return (
        <>
        <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleToggle}>
                Add Widget
            </Button>
        </div>
            {/*{isOpen && (*/}
            {/*        <OpenDailog*/}
            {/*        isOpen={isOpen}*/}
            {/*        onClose={handleClose}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    )
}
export default DailogPractice