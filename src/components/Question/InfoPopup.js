import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'bootstrap-pixel-icons/bootstrap-pixel-icons.css';

export default function InfoPopup({ msg }) {
    if (msg.length === 0) return '';
    return (
        <Popup
            trigger={
                <span
                    style={{
                        fontSize: '3em',
                        color: 'green',
                    }}
                    className='px-question-circle nes-pointer'
                />
            }
            position={'left bottom'}
            on='hover'
            closeOnDocumentClick
            mouseLeaveDelay={100}
            mouseEnterDelay={0}
        >
            <div style={{ width: '300px' }}>
                <div className={'nes-balloon from-right'}>
                    <p>{msg}</p>
                </div>
            </div>
        </Popup>
    );
}
