
import { createContext, useContext, useState, ReactNode } from 'react';
import type { CapturedBeast } from '../Data/beasts';
import { beasts } from '../Data/beasts';

type CapturedBeastsContextType = {
    capturedBeasts: CapturedBeast[];
    addCapturedBeast: (id: string) => void;
};

const CapturedBeastsContext = createContext<CapturedBeastsContextType | undefined>(undefined);

export function CapturedBeastsProvider({ children }: { children: ReactNode }) {

    const [capturedBeasts, setCapturedBeasts] = useState<CapturedBeast[]>(
        beasts.map(beast => ({
            id: beast.id,
            quantity: 0
        }))
    );
    const addCapturedBeast = (id: string) => {
        setCapturedBeasts(prev =>
            prev.map(beast =>
                beast.id === id
                    ? { ...beast, quantity: beast.quantity + 1 }
                    : beast
            )
        );
    };

    return (
        <CapturedBeastsContext.Provider value={{ capturedBeasts, addCapturedBeast }}>
            {children}
        </CapturedBeastsContext.Provider>
    );
}

export function useCapturedBeasts() {
    const context = useContext(CapturedBeastsContext);

    if (!context) {
        throw new Error('useCapturedBeasts must be used inside CapturedBeastsProvider');
    }

    return context;
}
