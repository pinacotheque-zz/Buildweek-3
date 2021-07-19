import PdfPrinter from "pdfmake"
import imageToBase64 from "image-to-base64"

const getImageB64FromUrl = async (url) => {
  const b64 = await imageToBase64(url)
  return b64
}

const cvDoc = async (profile) => {
  return {
    content: [
      {
        alignment: "justify",
        columns: [
          {
            image: "data:image/jpeg;base64," + (await getImageB64FromUrl(profile.image)),
            width: 150,
            height: 150,
          },
          [
            {
              text: profile.name + " " + profile.surname,
              margin: [20, 0, 0, 0],
              fontSize: 30,
              bold: true,
            },
            {
              text: profile.title,
              margin: [20, 0, 0, 0],
              fontSize: 15,
              bold: true,
            },
            {
              text: "Area: " + profile.area,
              margin: [20, 50, 0, 0],
            },
            {
              text: "Email: " + profile.email,
              margin: [20, 10, 0, 0],
            },
            {
              canvas: [
                {
                  type: "line",
                  x1: 20,
                  y1: 10,
                  x2: 350,
                  y2: 10,
                  lineWidth: 0.5,
                },
              ],
            },
          ],
        ],
      },
      {
        text: "ABOUT",
        margin: [0, 50, 0, 0],
        fontSize: 18,
        bold: true,
      },
      profile.bio,
    ],
  }
}

export const generatePDFReadableStream = async (data, definition) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-Oblique",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = await definition(data)
  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()
  return pdfReadableStream
}

export const getPdfCV = async (profile) => {
  const pdfStream = await generatePDFReadableStream(profile, cvDoc)
  return pdfStream
}
