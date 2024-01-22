let pdf = require('html-pdf')

class PDFWriter {

  static WritePDF(fileName, html) {
    pdf.create(html,{},).toFile(fileName, (error) => {})
  }
}


module.exports = PDFWriter