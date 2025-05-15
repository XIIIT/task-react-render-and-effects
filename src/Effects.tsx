import { subscribe, unsubscribe } from './resources/API';
import React, { useState, useEffect } from 'react';

interface Props {
    sourceId: string;
}

export function Effects({ sourceId }: Props) {
    const [lastMessage, setLastMessage] = useState<number | null>(null);
    const [sourceName, setSourceName] = useState('');

    useEffect(() => {
        setLastMessage(null);

        const callback = (message: number) => {
            setLastMessage(message);
        };

        const fetchData = async () => {
            try {
                setSourceName(sourceId);
            } catch (error) {
                setSourceName('unfound');
            }
        };

        fetchData();

        subscribe(sourceId, callback);

        return () => {
            unsubscribe(sourceId, callback);
        };
    }, [sourceId]);

    return (
        <div>
            {sourceName}: {lastMessage === null ? -1 : lastMessage}
        </div>
    );
}
