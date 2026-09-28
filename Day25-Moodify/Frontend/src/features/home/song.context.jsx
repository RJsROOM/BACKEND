import {createContext, useState} from "react";


export const SongContext= createContext();

export const SongContextProvider= ({children})=>{

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/qbtyrmiqx/moodster/songs/undefined_EhbTQSQ21.mp3",
        "posterUrl": null,
        "title": "Unknown Song",
        "mood": "happy",
    })


    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider 
            value= {{loading, setLoading, song, setSong}}>
            {children}
        </SongContext.Provider>
    )
}