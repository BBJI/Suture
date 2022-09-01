import React, { lazy, Suspense } from 'react';

export default function lazyLoadRoutes(path: string) {
    const Element = lazy(() => import(/* webpackChunkName: "[request]" */`../../${path}`));
    return (
        <Suspense fallback={'加载中...'}>
            <Element />
        </Suspense>
    );
}
