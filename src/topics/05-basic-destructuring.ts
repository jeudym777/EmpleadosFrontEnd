interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: {
        author: string;
        year: number;
    }
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
} 


// const {} = audioPlayer;
const { song:anothersong, songDuration:duration, details } = audioPlayer;

const { author } = details;

console.log('Song: ', anothersong );
console.log('Duration: ', duration );
console.log('Author: ', author );

// el not found es la forma por defecto que se le da al valor en caso de que no exista
const [ , , trunks = 'Not found' ]: string[] = ['Goku', 'Vegeta'];

console.error('Personaje 3:', trunks );


export {};