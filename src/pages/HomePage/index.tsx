import React, { useEffect } from 'react';

const Home = () => {
    useEffect(function () {
        let iframe = document.getElementsByTagName('iframe')[0];
        console.log(iframe);
        iframe.onload = () => {
            console.log(2222);
            document.getElementsByTagName('iframe')[0].contentWindow?.postMessage({ a: 1, b: 2 }, '*');
        };
    }, []);

    return (
        <div>
            Home
            <iframe src="http://192.168.31.167:9000"></iframe>
        </div>
    );
};

export default Home;
