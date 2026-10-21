# Worker -> 
## ANAGRAFICA
|CAMPO          |   TIPO        |   REQUIRED    |   NOTE |
| --- | --- | --- | --- |
|codiceFiscale  |   String      |   Yes         | 16 caratteri maiuscolo, univoco per sede   |
|name           |   String      |   Yes         | 
|lastname       |   String      |   Yes         | 
|gender         |   String/Enum |   Yes         | M,F|
|birthDate      |   Date        |   yes         | 
|birthCountry   |   String      |   yes         | codice paese internazionale|
|nationality    |   String      |   yes         | codice paese|
|phone          |   String      |   Yes         |
|email          |   String      |   No          | 
|address        |   String      |   Yes         | 
|city           |   String      |   Yes         |
|province       |   String      |   Yes         |
|profileImage   |   object      |   No         |Cloudinary URL|

## CURRICULUM
| Campo | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
|jobTypes          | String(enum) |   Yes  | badante, colf babysitter |
|workArrangements  | String(enum) |   Yes  | convivente, convivente part-time, non convivente, notturna |
|availableFor      | String(enum) |   No   | weekend, sostituzioni, sforzi fisici |
|experienceWith    | String(enum) |   No   |neonati, bambini, anziani, allettati, alzheimer/demenza, oncologici, PEG, autismo |
|skills            | String(enum) |   No   |punture, pressione, glicemia, cucinare, sollevatore, ossigeno, giocare a carte |
| acceptedPets     | String(enum) |   No   |cani, gatti. Lista vuota = nessun animale |
|smoker            |   Boolean    |   No   | default: false|
| hasDrivingLicense | Boolean     | no     | Default false |
| hasCar            | Boolean     | no     | Default false |
| yearsInItaly      | Number      | no     | |
| hasReferences     | Boolean     | no     | Default false |
|rating             | Number      | no     | Valutazione della sede da 0 a 10|
|notes              | String      | No     | |



## Elenchi
### languages (elenco di oggetti)
| Campo     | Tipo          | Obbligatorio | Note |
| ---       | ---           | ---          | ---  |
| language  | String        | Yes           | Codice lingua (es. it, ro, uk) |
| level     | String(enum)  | Yes           | base, intermedio, buono, madrelingua |


### documents (elenco di oggetti)

| Campo | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| type | String (enum) | Yes | carta d'identità, passaporto, permesso di soggiorno, altro |
| fileUrl    | String | Yes | Url di Cloudinary |
| publicId   | String | Yes | Serve per eliminare il file da Cloudinary |
| uploadedAt | Date   | Yes | Default: data di caricamento |
| expiryDate | Date   | No | Per segnalare i documenti scaduti o in scadenza |

### certifications (elenco di oggetti)

| Campo | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| type       | String (enum) | Yes | OSS, OSA, assistente familiare, UNI 11766, altro |
| issuer     | String        | no  | Ente che l'ha rilasciata |
| hours      | Number        | Yes | Durata del corso in ore |
| obtainedAt | Date          | no  | |
| fileUrl    | String        | no  | Url di Cloudinary dell'attestato |
| publicId   | String        | no  | |
| verified   | Boolean       | Yes | Default false. Solo la sede può impostarlo a true |


## Dati di sistema

| Campo | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
|sede           | ObjectId (ref: Sede) | Yes | Impostata automaticamente dalla sede dell'utente loggato |
|status         | String (enum) | Yes   | disponibile, occupata. Default disponibile. Aggiornato dai rapporti di lavoro |
|privacyConsent | Boolean       | Yes   | Deve essere true per salvare la scheda |
|privacyConsentDate | Date      | Yes   | |
|warning        | Object        | No     | Segnalazione di comportamento grave, vedi sotto |
|createdAt, updatedAt | Date | automatico | Aggiunti da Mongoose con l'opzione timestamps |

### warning (oggetto)

| Campo | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| isFlagged     | Boolean | Yes | Default false |
| reason        | String | Yes, se isFlagged | Descrizione dei fatti, in modo oggettivo |
| flaggedBy     | ObjectId (ref: User) | sì, se isFlagged | Chi ha fatto la segnalazione |
| flaggedAt     | Date | Yes, se isFlagged | |








