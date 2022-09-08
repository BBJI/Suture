import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import lazyLoadRoutes from '../utils/lazy-load-routes';

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: lazyLoadRoutes('pages/Root'),
            children: [
                {
                    path: '/home',
                    element: lazyLoadRoutes('pages/HomePage'),
                },
            ],
        },
        {
            path: '*',
            element: lazyLoadRoutes('pages/NotFound'),
        },
        {
            path: '/redirect',
            element: <Navigate to="/home" />,
        },
        {
            path: '/login',
            element: lazyLoadRoutes('pages/LoginPage'),
        },
    ]);
};
