import React from "react";
import './Titlebar.css'
import leftIcon from '../../assets/icons/PNG/chevrons-left.png'

export default function InboxTitleBar({ title, onBack, showBackIcon }) {
    return (
        <div className="inbox-title-bar">
            {
                showBackIcon && (
                    <div className="back-icon" onClick={onBack}>
                        <img src={leftIcon} alt='' />
                    </div>
                )
            }
            <div className="title text-overflow">
            { title}
            </div>
        </div>
    )
}