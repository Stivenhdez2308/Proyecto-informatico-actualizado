const PDFDocument = require('pdfkit');
const fs = require('fs');

async function guardarDiagnostico(req, res) {
    const { citaId, diagnostico, imagenes, video } = req.body;

    // Generar el PDF
    const pdf = new PDFDocument();
    const pdfPath = `ruta/del/diagnostico-${citaId}.pdf`;
    pdf.pipe(fs.createWriteStream(pdfPath));

    // Agregar contenido al PDF
    pdf.text(`Diagnóstico: ${diagnostico}`);

    pdf.end();

    res.status(200).json({ msg: 'Diagnóstico guardado y PDF generado', pdfPath });
}