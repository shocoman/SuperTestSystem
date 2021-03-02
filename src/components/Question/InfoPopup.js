import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'bootstrap-pixel-icons/bootstrap-pixel-icons.css';

export default function InfoPopup({ msg, scale=3, dir='left', width=400 }) {
    if (msg.length === 0) return '';
    return (
        <Popup
            trigger={
                <span
                    style={{
                        fontSize: scale + 'em',
                        color: 'green',
                    }}
                    className='px-question-circle nes-pointer'
                />
            }
            position={dir === 'left' ? 'left bottom' : 'right bottom'}
            on='hover'
            closeOnDocumentClick
            mouseLeaveDelay={100}
            mouseEnterDelay={0}
        >
            <div style={{ width: width + 'px' }}>
                <div className={'nes-balloon ' + (dir === 'left' ? 'from-right' : 'from-left')}>
                    <p>{msg}</p>
                </div>
            </div>
        </Popup>
    );
}
