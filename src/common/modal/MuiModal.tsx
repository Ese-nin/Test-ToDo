import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import s from "./modal.module.css";
import closeBtn from "assets/icon/closeBtn.svg";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 347,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    padding: 3,
    borderRadius: '15px'
};

type PropsType = {
    children: React.ReactNode;
    active: boolean;
    setActive: (value: boolean) => void;
};

export const MuiModal: React.FC<PropsType> = ({ children, active, setActive }) => {
    return (
        <>
            <Modal open={active} onClose={()=>setActive(false)}>
                <Box sx={style}>
                    <button className={s.closeButton}>
                        <img src={closeBtn} alt="close" onClick={()=>setActive(false)} />
                    </button>
                    {children}
                </Box>
            </Modal>
        </>
    );
};