import { createContext, useState } from "react";

export const SongContext = createContext(null);

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [savedExpression, setSavedExpression] = useState(null);

    return (
        <SongContext.Provider
            value={{
                loading,
                setLoading,
                song,
                setSong,
                playbackRate,
                setPlaybackRate,
                savedExpression,
                setSavedExpression,
            }}
        >
            {children}
        </SongContext.Provider>
    )
}
