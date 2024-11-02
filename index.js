const axios = require("axios");
const cheerio = require("cheerio");
async function cekKodePost(namaTempat) {
  try {
    const { data } = await axios.get("https://kodeposku.com/cari?q=" + namaTempat + "&_rsc=ckhpe",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
          'next-url':
            "/cari",
          referer:
            "https://kodeposku.com/cari"
        },
      })
    const $ = cheerio.load(data);

    // Array to hold extracted data
    let addressData = [];

    // Assuming each row in tbody represents an address
    $('table >tbody >tr').each((index, element) => {
      // Extracting data from each column
      const kodePos = $(element).find('td').eq(0).text().trim();
      const kelurahan = $(element).find('td').eq(1).text().trim();
      const kecamatan = $(element).find('td').eq(2).text().trim();
      const kabupatenKota = $(element).find('td').eq(3).text().trim();
      const provinsi = $(element).find('td').eq(4).text().trim();

      // Adding extracted data to the array
      addressData.push({
        KodePos: kodePos,
        Kelurahan: kelurahan,
        Kecamatan: kecamatan,
        KabupatenKota: kabupatenKota,
        Provinsi: provinsi
      });
    });

    // Outputting or using the extracted data
    return addressData
  }
  catch (e) {
    console.log(e.message)
  }

}
// cekKodePost("jakarta").then(a => console.log(a)).catch(error => console.error(error));

module.exports = { cekKodePost }
