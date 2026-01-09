import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (q) => {
  const doc = new jsPDF("p", "pt", "a4");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AK CONSTRUCTION", 40, 40);

  doc.setFontSize(11);
  doc.text("At Post Panderi, Tal: Mandangad, Dist: Ratnagiri", 40, 60);
  doc.text("Mob: 7276102921", 40, 75);
  doc.text("Email: arafatkazi094@gmail.com", 40, 90);

  doc.setDrawColor(255, 200, 0);
  doc.line(40, 100, 550, 100);

  doc.setFontSize(14);
  doc.text("QUOTATION", 250, 120);

  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 120);

  const details = [
    `Project: ${q.projectTitle || "-"}`,
    `Owner: ${q.ownerName || "-"}`,
    `Area Statement: ${q.areaStatement || "-"}`,
    `Total Area: ${q.totalArea || "-"}`,
  ];

  let yPos = 150;
  details.forEach((line) => {
    doc.text(line.replace(/&/g, "and"), 40, yPos);
    yPos += 20;
  });

  const rows = q.items.map((i, index) => [
    index + 1,
    i.description?.replace(/&/g, "and") || "-",
    i.unit || "-",
    i.area || "-",
    i.rate || "-",
    i.amount || "-",
  ]);

  autoTable(doc, {
    startY: yPos + 10,
    head: [["#", "Description", "Unit", "Area", "Rate", "Amount"]],
    body: rows,
    theme: "grid",
    styles: { fontSize: 10, halign: "center" },
    headStyles: { fillColor: [255, 200, 0], textColor: 0 },
  });

  const finalY = doc.lastAutoTable.finalY + 25;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: Rs. ${q.totalAmount || "0"}`, 40, finalY);

  const noteY = finalY + 30;
  doc.setFont("helvetica", "normal");
  doc.text("Note:", 40, noteY);
  doc.text(q.note?.replace(/&/g, "and") || "-", 70, noteY, {
    maxWidth: 460,
    align: "justify",
  });

  doc.line(40, 760, 550, 760);
  doc.text("For AK Construction", 400, 780);
  doc.text("Authorized Signature", 400, 795);

  const safeTitle = q.projectTitle?.replace(/[^\w\s]/gi, "_") || "quotation";
  doc.save(`${safeTitle}_quotation.pdf`);
};
