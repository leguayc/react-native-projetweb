let audios = [];

export const stopAllAudio = () => {
    audios.forEach(audio => {
        if (audio)
        {
            audio.pause();
            audio = undefined;
        }
    });

    audios = [];
};

export const playAudio = (id, url) => {
    console.log('test');

    if (audios[id])
    {
        console.log('test2');
        audios[id].pause();
        audios[id] = undefined;
    }

    audios[id] = new Audio(url);
    
    audios[id].onended = () => {
        console.log('test4');
        audios[id] = undefined;
    }
    
    audios[id].play();
    console.log('test3');
}