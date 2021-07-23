import PdfPrinter from "pdfmake"
import imageToBase64 from "image-to-base64"

const getImageB64FromUrl = async (url) => {
  const b64 = await imageToBase64(url)
  return b64
}

const cvDoc = async (profile) => {
  const experiences = await Promise.all(
    profile.experiences.map(async (e) => {
      const row = {
        columns: [
          {
            image: "data:image/jpeg;base64," + (await getImageB64FromUrl(e.image)),
            width: 90,
            height: 90,
          },
          [
            {
              text: e.role,
              fontSize: 20,
              margin: [20, 0, 0, 0],
            },
            {
              text: e.company,
              color: "grey",
              margin: [20, 4, 0, 0],
              fontSize: 14,
            },
            {
              text: `${new Date(e.startDate).getMonth() + 1}, ${new Date(
                e.startDate
              ).getFullYear()} - ${new Date(e.endDate).getMonth() + 1}, ${new Date(
                e.endDate
              ).getFullYear()}`,
              color: "grey",
              margin: [20, 4, 0, 0],
              fontSize: 14,
            },
            e.area
              ? {
                  text: e.area,
                  color: "grey",
                  margin: [20, 4, 0, 0],
                  fontSize: 14,
                }
              : {},
            e.description
              ? {
                  text: e.description,
                  margin: [20, 4, 0, 0],
                  fontSize: 14,
                }
              : {},
          ],
        ],
        margin: [0, 25, 0, 0],
      }
      return row
    })
  )

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
              margin: [20, 60, 0, 0],
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
        margin: [0, 35, 0, 0],
        fontSize: 25,
        bold: true,
      },
      { text: profile.bio, fontSize: 18, margin: [0, 10, 0, 0] },
      {
        text: "EXPERIENCES",
        margin: [0, 30, 0, 0],
        fontSize: 25,
        bold: true,
      },
      ...experiences,
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
