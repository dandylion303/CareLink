const minimiRetributivi = {
    anno: 2026,
    tabella: {
        A: {
            regime: "convivenza",
            tipoRetribuzione: "mensile",
            oreMinime: 25,
            oreMassime: 54,
            livelli: {
                A: 908.10,
                AS: 958.55,
                B: 983.16,
                BS: 1053.39,
                C: 1123.63,
                CS: 1193.84,
                D: 1404.51,
                DS: 1474.73,
            },
            indennita: [
                {
                    descrizione: 'due assistiti',
                    importo: 119.66,
                    livelli: ["CS", "DS"],
                    condizione: "2Assistiti"
                },
                {
                    descrizione: 'bambini',
                    importo: 138.54,
                    livelli: ["BS"],
                    condizione: "minori6Anni"
                },
                {
                    descrizione: "indennita di funzione",
                    importo: 207.69,
                    livelli: ["D", "DS"],
                    condizione: "sempre"
                }
            ]

        },
        B: {
            regime: "convivenza",
            tipoRetribuzione: "mensile",
            oreMinime: 25,
            oreMassime: 30,
            livelli: {
                B: 702.25,
                BS: 737.39,
                C: 814.60,
            },
            indennita:
            [{
                descrizione: 'bambini',
                importo: 97.06,
                livelli: ["BS"],
                condizione: "minori6Anni"
            }],
        },
        C: {
            regime: "nonConvivenza",
            tipoRetribuzione: "oraria",
            oreMinime: 1,
            oreMassime: 40,
            livelli: {
                A: 6.51,
                AS: 6.76,
                B: 7.01,
                BS: 7.45,
                C: 7.86,
                CS: 8.30,
                D: 9.57,
                DS: 9.97,
            },
            indennita: [
                {
                    descrizione: 'due assistiti',
                    importo: 0.70,
                    livelli: ["CS", "DS"],
                    condizione: "2Assistiti"
                },
                {
                    descrizione: 'bambini',
                    importo: 0.84,
                    livelli: ["BS"],
                    condizione: "minori6Anni"
                }
            ]
        },
        D: {
            regime: "convivenza",
            tipoRetribuzione: "mensile",
            oreMinime: 25,
            oreMassime: 54,
            livelli: {
                BS: 1211.38,
                CS: 1372.91,
                DS: 1695.99,
            },
            indennita:
            [{
                descrizione: 'due assistiti',
                importo: 119.66,
                livelli: ["CS", "DS"],
                condizione: "2Assistiti"
            }],
        },
        E: {
            regime: "convivenza",
            tipoRetribuzione: "mensile",
            oreMinime: 25,
            oreMassime: 54,
            livelli: {
                livelloUnico: 811.09
            },
            indennita:[],
        },
        G: {
            regime: "nonConvivenza",
            tipoRetribuzione: "oraria",
            oreMinime: 2,
            oreMassime: 40,
            livelli: {
                CS: 8.91,
                DS: 10.75
            },
            indennita:[],
        }
    },
}


export default minimiRetributivi