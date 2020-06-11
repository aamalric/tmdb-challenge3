import {Movie, Serie} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};


export const getMovies = async()=> {
    const genresResult = await get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    const movies = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const {results = []} = movies;
    const { genres } = genresResult

    if(results.length){
        return results.map((data)=>{
            const genresData = []
            data.genre_ids.forEach(g => {
                const found = genres.find(obj => obj.id === g)
                if(found)
                    genresData.push(found.name)
            })
            return new Movie(data, genresData);
        });
    }

    return [];
};

export const getSeries = async()=> {
    const genresResult = await get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`)
    const series = await get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
    const {results = []} = series;
    const { genres } = genresResult

    if(results.length){
        return results.map((data)=>{
            const genresData = []
            data.genre_ids.forEach(g => {
                const found = genres.find(obj => obj.id === g)
                if(found)
                    genresData.push(found.name)
            })
            return new Serie(data, genresData);
        });
    }

    return [];
};

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

