const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/create-pdf", async (req, res) => {
  const { htmlContent } = req.body;

  const htmlOut = htmlTemplate(htmlContent, htmlContent, htmlContent);

  try {
    const pdfBuffer = await generatePDF(htmlOut);
    res.type("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error creating PDF:", error);
    res.status(500).send("Error creating PDF");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}

const htmlTemplate = (name, surname, phone) => {
  const htmlOutput = `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="images/favicon.png" rel="icon" />
<title>General Invoice - PageCapture</title>

<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div class="max-w-7xl mx-auto">
<header class="flex justify-between px-10 py-5">
    <svg viewBox="0 0 280 202.704" xmlns="http://www.w3.org/2000/svg" class="h-32 text-gray-900"><switch xmlns="http://www.w3.org/2000/svg" transform="translate(61.98 -6.02) scale(1.57039)" fill="#0618a3"><g xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" i:extraneous="self"><path d="M96.167 57.061V41.756l-10.46-3.111c-.69-2.257-1.498-4.422-2.587-6.472l5.379-9.735-10.797-10.821-9.722 5.333c-2.049-1.091-4.209-1.884-6.464-2.575L58.41 3.833H43.105l-3.111 10.541c-2.257.692-4.422 1.539-6.472 2.63l-9.735-5.36-10.821 10.809L18.3 32.18c-1.091 2.049-2.559 4.211-3.249 6.468L3.833 41.756v15.305l11.217 3.111c.69 2.257 1.876 4.422 2.966 6.472l-5.192 9.735L23.717 87.2l9.77-5.333c2.049 1.089 4.231 2.476 6.489 3.165l3.129 11.136H58.41l3.112-11.135c2.257-.688 4.421-1.833 6.472-2.924l9.735 5.21 10.82-10.881-5.333-9.766c1.09-2.048 1.801-4.228 2.492-6.487l10.459-3.124zM50.758 77.858c-15.715 0-28.454-12.738-28.454-28.45 0-15.713 12.739-28.452 28.454-28.452 15.714 0 28.451 12.739 28.451 28.452s-12.74 28.45-28.451 28.45z"></path><path d="M52.822 38.281l-.037-.01a1.879 1.879 0 00-2.306 1.321l-5.382 19.82a1.879 1.879 0 001.321 2.306l.037.01a1.879 1.879 0 002.306-1.321l5.382-19.82a1.88 1.88 0 00-1.321-2.306zm-12.599 3.384a1.88 1.88 0 000-2.658l-.027-.027a1.88 1.88 0 00-2.658 0l-8.335 8.335-1.356 1.356a1.878 1.878 0 000 2.657l1.356 1.356 8.335 8.335a1.88 1.88 0 002.658 0l.027-.027a1.88 1.88 0 000-2.658l-7.006-7.006a1.878 1.878 0 010-2.657l7.006-7.006zm31.929 7.006l-1.356-1.356-8.335-8.335a1.88 1.88 0 00-2.658 0l-.027.027a1.88 1.88 0 000 2.658l7.006 7.006a1.88 1.88 0 010 2.658l-7.006 7.006a1.88 1.88 0 000 2.658l.027.027a1.88 1.88 0 002.658 0l8.335-8.335 1.356-1.356a1.88 1.88 0 000-2.658z" fill-rule="evenodd" clip-rule="evenodd"></path></g></switch><path d="M17.999 166.865q2.639 1.39 4.068 3.75t1.428 5.26-1.33 5.199-3.988 3.631-6.43 1.33H6.272v8.453H0v-29.012h11.787q3.572 0 6.212 1.39zm-1.965 12.343q1.151-1.389 1.151-3.333 0-1.27-.595-2.402t-1.766-1.845-2.798-.714H6.27v9.683h6.39q2.222 0 3.373-1.389zm27.385 13.097q-.754 1.032-2.6 1.846t-4.028.814q-3.374 0-5.854-1.509t-3.79-4.107-1.31-5.775 1.31-5.775 3.79-4.107 5.854-1.508q2.262 0 3.989.773t2.639 1.965v-2.262h5.874v21.828h-5.874v-2.183zm-1.39-13.196q-1.626-1.726-4.365-1.726-2.778 0-4.385 1.726t-1.608 4.465q0 2.66 1.647 4.405t4.346 1.747q2.778 0 4.386-1.647t1.607-4.505q0-2.738-1.627-4.465zm32.644 20.876q-2.917 2.719-8.116 2.719-6.231 0-10.438-3.294l2.897-4.207q1.35 1.071 3.195 1.746t3.91.675q5.596 0 5.596-5.08v-.358q-2.382 1.945-6.112 1.945-3.453 0-6.073-1.449t-4.008-3.948-1.39-5.517q0-3.056 1.39-5.537t3.988-3.949 6.093-1.468q3.73 0 6.112 1.945v-1.548h5.873v19.884q0 4.722-2.917 7.441zm-5.675-11.629q1.37-.773 2.163-2.143t.794-2.996q0-1.667-.794-3.016t-2.163-2.124-3.036-.774q-2.7 0-4.346 1.687t-1.647 4.227q0 2.62 1.607 4.266t4.386 1.647q1.667 0 3.036-.774zm20.042 5.616q-2.718-1.071-4.663-3.631t-1.945-6.688 1.965-6.667 4.703-3.612 5.2-1.071q2.857 0 5.436 1.27t4.227 3.73 1.727 5.834q0 1.032-.04 1.786t-.08.953H88.347q.476 2.302 2.381 3.135t3.572.834q2.143 0 3.413-.774t2.183-1.766l4.604 2.659q-3.73 5.08-10.2 5.08-2.54 0-5.259-1.072zm1.21-15.26q-1.547 1.21-1.745 2.957h10.914q-.12-1.032-.794-1.984t-1.806-1.568-2.56-.615q-2.46 0-4.008 1.21zm42.606 14.15q-3.671 2.182-7.997 2.182-4.247 0-7.838-2.024t-5.696-5.477-2.103-7.54q0-4.05 2.103-7.502t5.696-5.477 7.838-2.024q4.286 0 7.977 2.163t5.795 5.775l-5.834 2.262q-1.39-1.985-3.513-3.255t-4.425-1.27q-2.54 0-4.683 1.29t-3.394 3.433-1.25 4.604 1.25 4.624 3.394 3.453 4.683 1.29q2.302 0 4.425-1.29t3.513-3.314l5.834 2.262q-2.104 3.651-5.775 5.834zm26.294-.557q-.755 1.032-2.6 1.846t-4.028.814q-3.374 0-5.854-1.509t-3.79-4.107-1.31-5.775 1.31-5.775 3.79-4.107 5.854-1.508q2.262 0 3.988.773t2.64 1.965v-2.262h5.873v21.828h-5.873v-2.183zm-1.39-13.196q-1.627-1.726-4.365-1.726-2.778 0-4.386 1.726t-1.607 4.465q0 2.66 1.647 4.405t4.346 1.747q2.778 0 4.385-1.647t1.608-4.505q0-2.738-1.628-4.465zm19.011-4.266q.754-1.032 2.6-1.846t4.028-.813q3.373 0 5.854 1.508t3.79 4.107 1.31 5.775-1.31 5.775-3.79 4.107-5.854 1.509q-2.262 0-3.989-.774t-2.639-1.965v9.287h-5.874V172.66h5.874v2.183zm1.39 13.196q1.626 1.726 4.365 1.726 2.778 0 4.385-1.726t1.608-4.465q0-2.659-1.647-4.405t-4.346-1.747q-2.778 0-4.386 1.647t-1.607 4.505q0 2.739 1.627 4.465zm28.376-1.33q0 1.39.476 2.322t2.223.933q.794 0 1.508-.08v5.001q-1.429.159-2.659.159-2.54 0-4.108-.417t-2.44-1.607-.874-3.413v-12.105h-2.659v-5.2h2.66v-5.834h5.873v5.835h4.366v5.199h-4.366v9.207zm8.89-1.071v-12.899h5.993v12.899q0 2.341 1.171 3.353t3.076 1.013q1.667 0 2.977-1.29t1.19-4.426V172.74h5.953v21.75h-5.953v-1.866q-1.071 1.111-2.6 1.726t-3.234.616q-8.573 0-8.573-9.327zm36.553-7.283q-1.706.417-3.135 1.965t-1.429 4.524v9.644h-5.914V172.66h5.914v2.897q1.468-1.945 3.592-2.64t3.87-.654v5.794q-1.191-.119-2.898.298zm11.37 15.617q-2.718-1.071-4.663-3.631t-1.944-6.688 1.964-6.667 4.703-3.612 5.2-1.071q2.857 0 5.437 1.27t4.227 3.73 1.726 5.834q0 1.032-.04 1.786t-.08.953h-17.224q.477 2.302 2.382 3.135t3.571.834q2.144 0 3.414-.774t2.183-1.766l4.603 2.659q-3.73 5.08-10.2 5.08-2.54 0-5.258-1.072zm1.211-15.26q-1.548 1.21-1.746 2.957h10.914q-.119-1.032-.794-1.984t-1.805-1.568-2.56-.615q-2.46 0-4.009 1.21z" fill="#111827"></path></svg>
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl flex items-end">Invoice</h1>
</header>

<hr>

<section class="flex justify-between px-10 py-5">
    <p class="text-xs">
        <strong>Date:</strong>
        01/01/2022
    </p>

    <p class="text-xs">
        <strong>Invoice No:</strong>
        18635
    </p>
</section>

<hr>

<section class="flex justify-between px-10 py-5">
    <p class="text-xs">
        <strong>Invoiced To:</strong><br>
       ${name},<br>
        ${surname},<br>
        ${phone},<br>
        SW1A 1AA
    </p>

    <p class="text-xs text-right">
        <strong>Pay To:</strong><br>
        Elow Development<br>
        peter@elowdevelopment.com
    </p>
</section>

<section class="px-10 py-5">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                    Rate
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                    QTY
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                    Amount
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white">
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-900">
                    Custom Website Design
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                    Wireframes and mockups <br>
                    for a 3 page website.
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $50ph
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    24hrs
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $1,200
                </td>
            </tr>

            <tr class="bg-gray-50">
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-900">
                    Website Development
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                    Hosting provisioned, website <br>
                    created and deployed.
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $40ph
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    16hrs
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $640
                </td>
            </tr>

            <tr class="bg-white">
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-900">
                    SEO
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                    Website copy written. Website <br>
                    submitted to search engines.
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $25ph
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    12hrs
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right">
                    $300
                </td>
            </tr>

            <tr class="bg-gray-50">
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-900 font-medium text-right" colspan="4">
                    Sub-Total
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right font-medium">
                    $2,140
                </td>
            </tr>
            <tr class="bg-gray-50">
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-900 font-medium text-right" colspan="4">
                    Tax @ 20%
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-right font-medium">
                    $428
                </td>
            </tr>
            <tr class="bg-gray-50">
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right" colspan="4">
                    Total
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-medium">
                    $2,568
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</section>
</div>
</body>
</html>
`;
  return htmlOutput;
};
