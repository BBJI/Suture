import React from 'react';
import { Outlet } from 'react-router-dom';

window.addEventListener('message', (data) => {
    console.log(data, 'dd');
});

const Root = () => {
    return (
        <div>
            Root
            <Outlet />
            <video controls autoPlay>
                <source type='application/x-mpegURL' src='http://192.168.31.167:9000/hls/obs.m3u8'/>
            </video>
            <img src='http://192.168.31.167:9000/webdav/photo/Refined/GH__6266.jpg' style={{ width: '500px', display: 'block' }} />
            <img src='static/images/test.png' />
        </div>
    );
};

export default Root;
