import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.registerHyphenationCallback((word) => [word])
const regimeLabels = {
    convivente: 'Convivente',
    conviventePartTime: 'Convivente part-time',
    nonConvivente: 'Non convivente',
    notturno: 'Notturno',
}

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('it-IT') : '')

const styles = StyleSheet.create({
    page: { paddingTop: 32, paddingHorizontal: 40, paddingBottom: 30, fontSize: 9.5, fontFamily: 'Helvetica', lineHeight: 1.35 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 25, marginTop:25, borderBottomWidth: 1, borderColor: '#145A5A', paddingBottom: 5 },
    sedeName: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#145A5A', textAlign: 'right' },
    title: { fontSize: 13, fontFamily: 'Helvetica-Bold' },
    subtitle: { fontSize: 9.5 },
    table: { borderWidth: 1, borderColor: '#E2E2DC', marginBottom: 10 },
    row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E2E2DC' },
    lastRow: { flexDirection: 'row' },
    labelCell: { width: '50%', paddingVertical: 4, paddingHorizontal: 6, fontFamily: 'Helvetica-Bold' },
    valueCell: { width: '50%', paddingVertical: 4, paddingHorizontal: 6 },
    capitalize: { textTransform: 'capitalize' },
    paragraph: { marginBottom: 7, textAlign: 'justify' },
    signatures: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    signatureLine: { borderTopWidth: 1, borderColor: '#000', width: 200, marginTop: 24 },
    privacy: { fontSize: 7.5, marginTop: 16, color: '#555' },
    footer: { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, textAlign: 'center', color: '#999' },
})

const TableRow = ({ label, value, isLast, capitalize }) => (
    <View style={isLast ? styles.lastRow : styles.row}>
        <Text style={styles.labelCell}>{label}</Text>
        <Text style={capitalize ? [styles.valueCell, styles.capitalize] : styles.valueCell}>{value}</Text>
    </View>
)

export const RequestPdf = ({ request }) => {
    const family = request.famiglia
    const sedeName = request.sede?.name || 'la sede territoriale'

    const durationText = request.durationType === 'determinato'
        ? `Determinato, dal ${formatDate(request.startDate)} al ${formatDate(request.endDate)}`
        : `Indeterminato, dal ${formatDate(request.startDate)}`

    return (
        <Document title={`Incarico - ${family.customerName} ${family.customerLastname}`}>
            <Page size="A4" style={styles.page}>

                {/* ---------- INTESTAZIONE ---------- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>INCARICO</Text>
                        <Text style={styles.subtitle}>Autorizzazione all'attività di ricerca e intermediazione al lavoro</Text>
                    </View>
                    <Text style={styles.sedeName}>{sedeName}</Text>
                </View>

                {/* ---------- IL PROPONENTE ---------- */}
                <View style={styles.table}>
                    <TableRow label="Il proponente" value={`${family.customerName} ${family.customerLastname}`} capitalize />
                    <TableRow label="Residente in" value={family.customerAddress?.address} />
                    <TableRow label="Città" value={`${family.customerAddress?.city} (${family.customerAddress?.provincia})`} capitalize />
                    <TableRow label="Codice fiscale" value={family.codiceFiscale} isLast />
                </View>

                <Text style={styles.paragraph}>
                    Conferisce l'incarico a {sedeName} per svolgere l'attività di ricerca e selezione, nonché
                    l'attività di mediazione tra domanda e offerta di lavoro, finalizzata all'assunzione della
                    seguente figura professionale:
                </Text>

                {/* ---------- LA RICERCA ---------- */}
                <View style={styles.table}>
                    <TableRow label="Qualifica" value={request.serviceType} capitalize />
                    <TableRow label="Regime" value={regimeLabels[request.workRequest] ?? request.workRequest} />
                    <TableRow label="Tempo" value={durationText} />
                    <TableRow label="Ore lavorative settimanali" value={`${request.oreSettimanali} ore`} />
                    <TableRow label="Inquadramento CCNL" value={`Livello ${request.livello}, tabella ${request.inquadramento}`} />
                    <TableRow label="Paga indicativa" value="" isLast />
                </View>

                {/* ---------- IMPEGNI ---------- */}
                <Text style={styles.paragraph}>
                    {sedeName}, accettando l'incarico, provvederà a svolgere le seguenti attività: valutazione delle
                    specifiche necessità di ricerca del proponente; ricerca del personale tra i curriculum raccolti
                    nella propria banca dati; promozione e gestione dell'incontro tra domanda e offerta di lavoro,
                    attraverso la mediazione tra le parti.
                </Text>
                <Text style={styles.paragraph}>
                    Il proponente dichiara di essere stato informato che, ad esito positivo della ricerca, dovrà
                    tempestivamente provvedere all'assunzione della figura professionale, al fine di non incorrere in
                    sanzioni in materia di diritto del lavoro e in responsabilità civili, penali e amministrative.
                    Il proponente riconosce altresì che {sedeName} svolge la mera attività di ricerca e
                    intermediazione, senza potere decisionale sulla scelta definitiva della figura professionale,
                    intendendosi quest'ultima esclusiva prerogativa del proponente.
                </Text>
                <Text style={styles.paragraph}>
                    Per il tempo e l'impegno impiegato nella ricerca della figura professionale più consona, il
                    proponente si impegna al versamento di un contributo economico pari a:
                </Text>

                {/* ---------- CONTRIBUTO ---------- */}
                <View style={styles.table}>
                    <TableRow label="Acconto (comprensivo della quota di tesseramento annuale)" value="€" />
                    <TableRow label="Saldo (da corrispondere a ricerca ultimata)" value="€" />
                    <TableRow label="TOTALE" value={request.serviceFee ? `€ ${request.serviceFee}` : '€'} isLast />
                </View>

                <View wrap={false}> {/* Per non spezzare il documento su più pagine */}
                    <Text>Per accettazione</Text>
                    <View style={styles.signatures}>
                        <View>
                            <Text>Data e luogo</Text>
                            <View style={styles.signatureLine} />
                        </View>
                        <View>
                            <Text>Firma del proponente</Text>
                            <View style={styles.signatureLine} />
                        </View>
                    </View>

                    <Text style={styles.privacy}>
                        I dati personali sono trattati per le finalità del servizio richiesto, ai sensi del Regolamento
                        UE 2016/679 (GDPR) e del D.Lgs. 196/2003 e successive modifiche. Per quanto non espressamente
                        previsto dalla presente proposta si applicano le disposizioni del codice civile. In caso di
                        controversia, il Foro competente sarà quello di Bologna.
                    </Text>
                </View>

                <Text style={styles.footer} fixed>Documento generato da CareLink</Text>
            </Page>
        </Document>
    )
}