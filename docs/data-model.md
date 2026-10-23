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



# Family->
## ANAGRAFICA
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|customerName            |String      |   Yes     |   
|customerLastname        |String      |   Yes     |
|codiceFiscale           |String      |   Yes     |
|phone                   |String      |   Yes     |
|email                   |String      |   Yes     |
|customerAddress         |String      |   Yes     |
|sede                    |ref         |   Yes     |Automatico
|PrivacyConsentDate      |date        |   Yes     |Automatico, al caricamento del documento firmato|


## REQUEST
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|family                 |ref          |  Yes      |quale famiglia cerca|
|ServiceType            |String(enum) |  Yes      |colf, badante, babysitter|
|workRequest            |String(enum) | Yes       |convivente, convivente part-time, non convivente, assistenza notturna, presenza notturna|
|oreRichiesteSettimana  |Number       | Yes       |
|schedule               |String       | Yes       |orari di lavoro richiesti|
|weekendNeeded          |Boolean      | no        |
|durationType           |String(enum) | Yes       |determinato, indeterminato|
|startDate              |Date         |Yes        |
|endDate                |Date         |No         |
|workAddress            |String       |Yes        |
|workCity               |String       |Yes        |
|workProvince           |String       |Yes        |
|pets                   |{object}     |No         |cane: numero, gatto: numero|
|requiredLanguage       |String       |No         |
|requiredDrivingLicense |Boolean      |No         |
|notes                  |String       |No         |

## REQUEST = COLF
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|otherStaff             |Boolean      |No         |
|specificCompetence     |String(enum) |No         |cucina, giardino, autista|
|experienceRequired     |Boolean      |No         |

## REQUEST = BABYSITTER
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|numberOfChildren       |Number       |Yes        |
|dateOfBirthYoungest    |Date         |Yes        |
|specialNeeds           |String       |No         |per bambini autistici o con deficit|


## REQUEST = BADANTE
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|numberOfAssisted       |Number       |Yes        |
|mainAssistedName       |String       |Yes        |
|birthDate              |Date         |Yes        |
|selfSufficientLevel    |String(enum) |Yes        |completamente autosufficiente, abbastanza autosufficiente, non autosufficiente, disabile grave|
|cognitiveState         |String(enum) |Yes        |lucido, demenza, alzheimer grave, altro|
|mobility               |String(enum) |Yes        |autonomo, bastone, girello, carrozzina, allettato |
|specialNeeds           |Boolean      |No         |
|therapiesDetail        |String       |No         |
|specialDiet            |String       |No         |
|sleepsAtNight          |Boolean      |No         |


## REQUEST - DATI GENERICI
| Campo                  |   Tipo     | Obbligatorio | Note |
| --- | --- | --- | --- |
|inquadramento           |String(enum)   |Yes      |tabella A,B,C,D,E|
|livello                 |String(enum)   |Yes      |A, AS, B, BS, C, CS, D, DS|
|maggiorazioni           |String         |No       |minori, +assistiti|
|statusRichiesta         |String(enum)   |Yes      |inAttesa, attiva, inProva, Chiusa|
|isPublic                |Boolean        |Yes      |
|publicDescription       |String         |No       |
|sede                    |ref            |Yes      |
|createdAt               |date           |Yes      |
|updatedAt               |date           |Yes      |


____________________________________

# Sede->
| Campo              |   Tipo | Obbligatorio | Note |
| ---                | ---    | ---          | ---  |
|name                |String  |Yes           |
|address             |String  |Yes           |
|city                |String  |Yes           |
|provincia           |String  |Yes           |
|phoneNumber         |String  |Yes           |
|email               |String  |Yes           |
|isActive            |Boolean |Yes           |
|createdAt           |date    |Yes           |
|updatedAt           |date    |Yes           |


# User->
| Campo              |   Tipo        | Obbligatorio | Note |
| ---                | ---           | ---          | ---  |
|email               |String         |Yes           |
|password            |String         |Yes           |
|role                |String(enum)   |Yes           |Admin, sede|
|isActive            |Boolean        |Yes           |
|sede                |ref            |Yes           |solo per sedi|
|createdAt           |date           |Yes           |
|updatedAt           |date           |Yes           |



____________________________________

# Job
| Campo              |   Tipo       | Obbligatorio | Note |
| ---                | ---          | ---          | ---  |
|employee            |ref           |Yes           |tabella Worker|
|request             |ref           |Yes           |tabella Request|
|family              |ref           |Yes           |tabella Family|
|city                |String        |Yes           |ref? da tabella request|
|sede                |ref           |Yes           |tabella Sede|
|startDate           |Date          |Yes           |
|endDate             |Date          |No            |
|status              |String(enum)  |Yes           |Attivo, Cessato|
|inquadramento       |String        |Yes           |ref? da tabella request|
|oreSettimanali      |Number        |Yes           |ref? da tabella request|
|createdAt           |date           |Yes           |
|updatedAt           |date           |Yes           |




