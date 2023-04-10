import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";

export default async function exportHours(data) {
	console.log("0");
	// Fetch an existing PDF document
	const url = "/pdfTemplate.pdf";
	const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

	const xCords = {
		date: 40,
		location: 75,
		weather: 220,
		dayHrs: 320,
		dayTotal: 365,
		nightHrs: 410,
		nightTotal: 455,
		grandTotal: 500,
		initials: 545,
	};

	const yCords = {
		start: 369,
		secPageStart: 713,
		offset: 15,
	};

	// Load a PDFDocument from the existing PDF bytes
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	console.log("2");

	// Embed the Helvetica font
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

	// Get the first page of the document
	const pages = pdfDoc.getPages();
	const firstPage = pages[0];
	const secondPage = pages[1];

	const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [1]);

	const neededPages = Math.ceil((data.length - 21) / 43);
	for (let index = 1; index < neededPages; index++) {
		await pdfDoc.addPage(copiedPage);
		pages.push(copiedPage);
	}

	// Get the width and height of the first page
	const { width, height } = firstPage.getSize();

	// Draw a string of text diagonally across the first page

	let dayTotal = 0,
		nightTotal = 0,
		grandTotal = 0;

	data.map((item, index) => {
		//Calculate Day, Night and Grand Totals
		let dayHrs, nightHrs;
		if (item.time === "night") {
			nightHrs = item.hours;
			dayHrs = 0;
			nightTotal += item.hours;
		} else {
			dayHrs = item.hours;
			nightHrs = 0;
			dayTotal += item.hours;
		}

		const pageIndex = Math.floor((index - 21) / 43) + 1;
		let currentYCord = yCords.start - yCords.offset * index;
		let currentPage = pages[pageIndex];
		console.log(pageIndex);

		//         if (index > 63 ) {
		//           currentYCord = 50;
		//           currentPage = pages[locationIndex];
		//         } else
		if (index > 20) {
			currentYCord =
				yCords.secPageStart -
				(index - 21 - 43 * (pageIndex - 1)) * yCords.offset;
		}

		currentPage.drawText(`${item.date.month}/${item.date.day}`, {
			x: xCords.date,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});

		currentPage.drawText(`${item.location}`, {
			x: xCords.location,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});

		currentPage.drawText(`${item.weather}`, {
			x: xCords.weather,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		currentPage.drawText(`${dayHrs}`, {
			x: xCords.dayHrs,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		currentPage.drawText(`${dayTotal}`, {
			x: xCords.dayTotal,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		currentPage.drawText(`${nightHrs}`, {
			x: xCords.nightHrs,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		currentPage.drawText(`${nightTotal}`, {
			x: xCords.nightTotal,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		currentPage.drawText(`${dayTotal + nightTotal}`, {
			x: xCords.grandTotal,
			y: currentYCord,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0),
		});
		// currentPage.drawText('SH', {
		//   x: xCords.initials,
		//   y: currentYCord,
		//   size: 10,
		//   font: helveticaFont,
		//   color: rgb(0,0,0),
		// });
	});

	// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save();

	// Trigger the browser to download the PDF document
	const pdfToShare = new File([pdfBytes], "Driving Hours.pdf", {
		type: "application/pdf",
	});
	const shareData = {
		text: "PDF of your driving hours",
		title: "Driving Hours",
		files: [pdfToShare],
	};

	return { pdfBytes, shareData };
	// download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
