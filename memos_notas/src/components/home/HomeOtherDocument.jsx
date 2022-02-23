import React, { useEffect } from 'react';
import { parametersOfDocuments } from './functions/parametersOfDocuments';

export const HomeOtherDocument = () => {

    useEffect(() => {
        parametersOfDocuments();
    }, []);

    return (
        <div>HomeOtherDocument</div>
    );
};
