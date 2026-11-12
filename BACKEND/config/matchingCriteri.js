const matchingCriteri = {
    regime: 25,          // il regime richiesto è tra quelli che accetta
    rating: 15,          // valutazione della sede, in proporzione (0-10)= max*worker.rating/10
    baseExperience: 10,  // anziani per le badanti, bambini o neonati per le babysitter
    bedridden: 10,       // assistito allettato: 5 per l'esperienza, 5 per sollevatore o sforzi fisici
    therapies: 10,       // terapie o macchinari: PEG, oncologici o ossigeno
    dementia: 5,         // esperienza con Alzheimer e demenza
    pets: 10,            // accetta tutti gli animali presenti in casa
    sostituzioni: 5,    // contratto a tempo determinato: disponibile per sostituzioni
    colfSkills: 5,       // competenze specifiche richieste alla colf
    patente: 5,   // patente richiesta
    sameCity: 5,         // abita nella città della richiesta
}

export default matchingCriteri

/* 
105 valutazione totale
70 punti max per la colf
75 punti max per la babysitter
100 punti max per la badante 
*/
