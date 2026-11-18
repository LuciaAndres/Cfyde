import { createContext, useContext, useState, ReactNode } from 'react';

type PlayerContextType = {
    xp:number;
    level:number;
    addXp: (xp: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export function PlayerProvider({ children }: { children: ReactNode }) {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    
    const addXp = (amount: number) => {
        const newXp = xp + amount;
        let newLevel = level;

        while (newXp >= 100 * (newLevel * (newLevel + 1)) / 2) {
            newLevel++;
        }

        setXp(newXp);
        setLevel(newLevel);
    };
    return (
        <PlayerContext.Provider value={{ xp, level, addXp }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error('usePlayer must be used inside PlayerProvider');
    }

    return context;
}
