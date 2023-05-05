import React from 'react';
import s from './modal.module.css'

type Props = {
    active: boolean
    setActive: (active: boolean) => void
    children: React.ReactNode
}

export const Modal: React.FC<Props> = ({active, setActive, children}) => {

    return (
        <div className={active ? s.modal + ' ' + s.active : s.modal} onClick={() => setActive(false)}>
            <div className={active ? s.modalContent + ' ' + s.active : s.modalContent}
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};