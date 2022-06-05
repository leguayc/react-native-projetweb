let audios = [];

export const stopAllAudio = () => {
    audios.forEach(audio => {
        if (audio)
        {
            audio.audio.pause();
            if (audio.onEnd)
            {
                audio.onEnd();
            }
            audio = undefined;
        }
    });

    audios = [];
};

export const playAudio = (id, url, callBack) => {
    if (audios[id])
    {
        audios[id].audio.pause();
        audios[id] = undefined;
    }

    audios[id] = { audio : new Audio(url), onEnd: callBack };
    
    audios[id].audio.onended = () => {
        if (audios[id].onEnd)
        {
            audios[id].onEnd();
        }
        audios[id] = undefined;
    }
    
    audios[id].audio.play();
}