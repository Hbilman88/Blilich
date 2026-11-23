import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { COMPANY_INFO } from "@/data/company";

export interface PDFQuoteItem {
  category: string;
  designation: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  priceType?: "unit" | "total";
  notes?: string;
}

export interface PDFQuoteData {
  reference: string;
  date: string;
  clientInfo: {
    nom: string;
    societe: string;
    ice?: string;
    telephone: string;
    email: string;
    remarques?: string;
  };
  deliveryMode: "magasin" | "chantier";
  deliveryCity?: string;
  deliveryAddress?: string;
  semiTrailerAccess?: boolean;
  items: PDFQuoteItem[];
  estimatedBudgetHT: number;
  boqFileName?: string;
}

export function generateQuotePDF(data: PDFQuoteData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. TOP HEADER BRANDING
  doc.setFillColor(11, 17, 32); // Deep Slate #0B1120
  doc.rect(0, 0, pageWidth, 28, "F");

  // Accent Line (Emerald #007A63)
  doc.setFillColor(0, 122, 99);
  doc.rect(0, 27, pageWidth, 2, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("GROUPE MOCOMEL", 14, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 190, 205);
  doc.text(
    "INGÉNIERIE ÉLECTRIQUE HT/BT · SOLUTIONS TERTIAIRES · DISTRIBUTION MATÉRIEL B2B",
    14,
    18
  );
  doc.text(
    `ACCRÉDITÉ ONEE · RC: ${COMPANY_INFO.legal.rc} · IF: ${COMPANY_INFO.legal.if} · TP: ${COMPANY_INFO.legal.tp} · ICE: ${COMPANY_INFO.legal.ice}`,
    14,
    23
  );

  // Document Badge on Right
  doc.setFillColor(255, 255, 255);
  doc.setTextColor(11, 17, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DEMANDE DE COTATION B2B", pageWidth - 14, 13, { align: "right" });
  doc.setTextColor(0, 122, 99);
  doc.setFontSize(9);
  doc.text(`RÉF : ${data.reference}`, pageWidth - 14, 19, { align: "right" });

  // 2. METADATA SECTION (2 COLUMNS)
  const metaY = 36;

  // Box 1: Details Consultation (Left)
  doc.setFillColor(248, 250, 252); // #F8FAFC
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.roundedRect(14, metaY, 86, 38, 2, 2, "FD");

  doc.setTextColor(11, 17, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("PARAMÈTRES DE LA DEMANDE", 18, metaY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Date d'émission : ${data.date}`, 18, metaY + 12);
  doc.text(
    `Mode de retrait : ${
      data.deliveryMode === "magasin"
        ? "Enlèvement Magasin 7 (Tit Mellil)"
        : "Livraison sur chantier"
    }`,
    18,
    metaY + 18
  );

  if (data.deliveryMode === "chantier") {
    doc.text(`Lieu : ${data.deliveryCity || "Non précisé"}`, 18, metaY + 24);
    doc.text(
      `Accès semi-remorque (38T) : ${
        data.semiTrailerAccess ? "Oui, accessible" : "Non / Accès restreint"
      }`,
      18,
      metaY + 30
    );
  } else {
    doc.text("Disponibilité : Stock central Casablanca", 18, metaY + 24);
    doc.text("Délai de préparation : 2 à 4h ouvrées", 18, metaY + 30);
  }

  // Box 2: Donneur d'ordre / Client (Right)
  doc.roundedRect(110, metaY, 86, 38, 2, 2, "FD");

  doc.setTextColor(11, 17, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("DONNEUR D'ORDRE / ACHETEUR", 114, metaY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Contact : ${data.clientInfo.nom}`, 114, metaY + 12);
  doc.text(`Société : ${data.clientInfo.societe || "Non précisée"}`, 114, metaY + 18);
  doc.text(`ICE : ${data.clientInfo.ice || "Non renseigné"}`, 114, metaY + 24);
  doc.text(`Tél : ${data.clientInfo.telephone} | Email : ${data.clientInfo.email}`, 114, metaY + 30);

  // 3. TABLE OF ITEMS
  const tableRows = data.items.map((item, index) => {
    const unitPriceText = item.targetPrice
      ? `${Number(item.targetPrice).toLocaleString("fr-FR")} MAD HT`
      : "Sur consultation";

    let lineTotalText = "Sur consultation";
    if (item.targetPrice && item.targetPrice > 0) {
      const lineTotal =
        item.priceType === "total"
          ? item.targetPrice
          : item.targetPrice * item.quantity;
      lineTotalText = `${Number(lineTotal).toLocaleString("fr-FR")} MAD HT`;
    }

    const designationFull = item.notes
      ? `${item.designation}\nRemarque : ${item.notes}`
      : item.designation;

    return [
      (index + 1).toString(),
      item.category || "Matériel Électrique",
      designationFull,
      `${item.quantity} ${item.unit}`,
      unitPriceText + (item.priceType === "total" ? " (Forfait)" : ""),
      lineTotalText,
    ];
  });

  const tableStartY = metaY + 44;

  autoTable(doc, {
    startY: tableStartY,
    head: [["N°", "Catégorie", "Désignation & Spécifications", "Quantité", "Budget Cible (u)", "Total Ligne"]],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [11, 17, 32],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center", fontSize: 7.5 },
      1: { cellWidth: 32, fontSize: 7.5 },
      2: { cellWidth: "auto", fontSize: 8 },
      3: { cellWidth: 22, halign: "right", fontStyle: "bold", fontSize: 8 },
      4: { cellWidth: 30, halign: "right", fontSize: 7.5 },
      5: { cellWidth: 30, halign: "right", fontStyle: "bold", fontSize: 8, textColor: [0, 122, 99] },
    },
    styles: {
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  // 4. SUMMARY BOX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastTableY = (doc as any).lastAutoTable?.finalY || tableStartY + 40;

  const summaryY = lastTableY + 8;

  // Check if we need a new page for summary and footer
  if (summaryY > pageHeight - 45) {
    doc.addPage();
  }

  const currentSummaryY = summaryY > pageHeight - 45 ? 20 : summaryY;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, currentSummaryY, pageWidth - 28, 22, 1.5, 1.5, "F");

  doc.setTextColor(11, 17, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(
    `Nombre total de lignes : ${data.items.length} référence(s)`,
    20,
    currentSummaryY + 8
  );

  if (data.boqFileName) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Bordereau / CCTP associé : ${data.boqFileName}`, 20, currentSummaryY + 15);
  } else if (data.clientInfo.remarques) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Note client : ${data.clientInfo.remarques.substring(0, 70)}...`, 20, currentSummaryY + 15);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(11, 17, 32);
  doc.text("BUDGET CIBLE GLOBAL ESTIMÉ :", pageWidth - 78, currentSummaryY + 8, {
    align: "right",
  });

  doc.setFontSize(11);
  doc.setTextColor(0, 122, 99);
  const formattedBudget =
    data.estimatedBudgetHT > 0
      ? `${Number(data.estimatedBudgetHT).toLocaleString("fr-FR")} MAD HT`
      : "Sur Consultation";
  doc.text(formattedBudget, pageWidth - 20, currentSummaryY + 15, {
    align: "right",
  });

  // 5. LEGAL NOTICE & FOOTER
  const footerY = pageHeight - 16;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY - 4, pageWidth - 14, footerY - 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Ce document constitue une expression de besoin technique et une demande de cotation B2B, sans engagement contractuel unilatéral.",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );
  doc.text(
    "Groupe MOCOMEL SARL · Siège & Magasin 7 : Tit Mellil, Grand Casablanca · Tél : 0665 922 500 / 0777 817 534 · mocomel.sarl@gmail.com",
    pageWidth / 2,
    footerY + 4,
    { align: "center" }
  );

  // Save the PDF
  const filename = `Bordereau_Cotation_MOCOMEL_${data.reference}.pdf`;
  doc.save(filename);
}
