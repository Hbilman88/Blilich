import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      items,
      deliveryMode,
      deliveryCity,
      deliveryAddress,
      semiTrailerAccess,
      clientInfo,
      estimatedBudgetHT,
      boqFileName,
    } = body;

    // Validation
    if (!clientInfo || !clientInfo.nom || !clientInfo.telephone || !clientInfo.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Veuillez renseigner vos coordonnées complètes (nom, téléphone, e-mail).",
        },
        { status: 400 }
      );
    }

    if ((!items || items.length === 0) && !boqFileName) {
      return NextResponse.json(
        {
          success: false,
          error: "Veuillez ajouter au moins un article ou joindre un bordereau quantitatif.",
        },
        { status: 400 }
      );
    }

    // Generate unique reference code DEV-MOC-2026-XXXX
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reference = `DEV-MOC-2026-${randomCode}`;

    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Africa/Casablanca",
      dateStyle: "full",
      timeStyle: "short",
    });

    console.log(`[API /api/devis] Nouvelle demande de devis enregistrée: ${reference}`, {
      reference,
      timestamp,
      itemCount: items?.length || 0,
      boqFileName,
      deliveryMode,
      estimatedBudgetHT,
      client: clientInfo,
    });

    // Check for Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const rowsHtml = (items || [])
          .map(
            (item: {
              category?: string;
              designation: string;
              quantity: number;
              unit: string;
              targetPrice?: number;
              priceType?: string;
              notes?: string;
            }) => `
            <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
              <td style="padding: 10px; color: #64748b;">${item.category || "—"}</td>
              <td style="padding: 10px; font-weight: 600; color: #0f172a;">${item.designation}</td>
              <td style="padding: 10px; text-align: right; color: #0f172a; font-family: monospace;">${item.quantity} ${item.unit}</td>
              <td style="padding: 10px; text-align: right; color: #007A63; font-weight: 600; font-family: monospace;">
                ${
                  item.targetPrice
                    ? `${Number(item.targetPrice).toLocaleString("fr-FR")} MAD HT ${
                        item.priceType === "total" ? "(Total)" : "(/u)"
                      }`
                    : "Sur consultation"
                }
              </td>
              <td style="padding: 10px; color: #64748b; font-size: 12px;">${item.notes || "—"}</td>
            </tr>
          `
          )
          .join("");

        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 750px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0B1120; color: #ffffff; padding: 24px; border-bottom: 3px solid #007A63;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700;">GROUPE MOCOMEL — DEMANDE DE COTATION B2B (RFQ)</h2>
              <p style="margin: 6px 0 0; color: #94A3B8; font-size: 13px;">Réf: <strong>${reference}</strong> | Reçu le: ${timestamp}</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <h3 style="color: #0B1120; font-size: 16px; margin-top: 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">1. Acheteur / Entreprise</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Nom & Prénom:</strong> ${clientInfo.nom}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Société:</strong> ${clientInfo.societe || "Non précisée"}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>ICE:</strong> ${clientInfo.ice || "Non renseigné"}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Téléphone:</strong> <a href="tel:${clientInfo.telephone}" style="color: #007A63; font-weight: 600;">${clientInfo.telephone}</a></p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>E-mail:</strong> <a href="mailto:${clientInfo.email}" style="color: #007A63;">${clientInfo.email}</a></p>

              <h3 style="color: #0B1120; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">2. Logistique & Mode de Livraison</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Mode:</strong> ${
                deliveryMode === "magasin"
                  ? "Enlèvement Magasin 7 (Tit Mellil, Casablanca)"
                  : "Livraison sur chantier"
              }</p>
              ${
                deliveryMode === "chantier"
                  ? `
                <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Ville du chantier:</strong> ${deliveryCity || "Non précisée"}</p>
                <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Adresse exacte:</strong> ${deliveryAddress || "Non précisée"}</p>
                <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Accès semi-remorque (38T):</strong> ${semiTrailerAccess ? "Oui, praticable" : "Non / Accès restreint"}</p>
              `
                  : ""
              }

              <h3 style="color: #0B1120; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">3. Bordereau des Articles (${(items || []).length} référence(s))</h3>
              ${
                (items || []).length > 0
                  ? `
                <table style="width: 100%; border-collapse: collapse; margin-top: 12px; text-align: left;">
                  <thead>
                    <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0; font-size: 12px; text-transform: uppercase; color: #64748b;">
                      <th style="padding: 10px;">Catégorie</th>
                      <th style="padding: 10px;">Désignation</th>
                      <th style="padding: 10px; text-align: right;">Quantité</th>
                      <th style="padding: 10px; text-align: right;">Budget Cible</th>
                      <th style="padding: 10px;">Remarque</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                  <tfoot>
                    <tr style="background-color: #f1f5f9; font-weight: 700; font-size: 14px; color: #0B1120;">
                      <td colspan="3" style="padding: 12px 10px; text-align: right;">Budget Indicatif Cible Total:</td>
                      <td style="padding: 12px 10px; text-align: right; color: #007A63; font-family: monospace;">
                        ${Number(estimatedBudgetHT || 0).toLocaleString("fr-FR")} MAD HT
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              `
                  : `<p style="font-size: 13px; color: #64748b;"><em>Bordereau basé sur fichier joint.</em></p>`
              }

              ${
                boqFileName
                  ? `
                <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px dashed #cbd5e1; border-radius: 6px; margin-top: 16px;">
                  <strong style="color: #0f172a; font-size: 13px;">Fichier bordereau / CCTP associé:</strong>
                  <span style="color: #007A63; font-family: monospace; font-size: 13px; margin-left: 8px;">${boqFileName}</span>
                </div>
              `
                  : ""
              }

              ${
                clientInfo.remarques
                  ? `
                <h3 style="color: #0B1120; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">4. Remarques Acheteur</h3>
                <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px; color: #1e293b; border: 1px solid #e2e8f0;">${clientInfo.remarques}</div>
              `
                  : ""
              }
            </div>
            <div style="background-color: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
              Groupe MOCOMEL SARL · Magasin 7 Tit Mellil · Téléphone: 0665 922 500 / 0777 817 534 · mocomel.sarl@gmail.com
            </div>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "MOCOMEL Devis <contact@mocomel.ma>",
            to: ["mocomel.sarl@gmail.com"],
            reply_to: clientInfo.email,
            subject: `[MOCOMEL DEVIS ${reference}] Demande de cotation - ${clientInfo.societe || clientInfo.nom}`,
            html: emailHtml,
          }),
        });
      } catch (err) {
        console.warn("[API /api/devis] Envoi Resend échoué, poursuite normale:", err);
      }
    }

    return NextResponse.json({
      success: true,
      reference,
      message: "Votre demande de cotation a été transmise au service commercial. Vous recevrez une offre chiffrée sous 24h à 48h ouvrées.",
      timestamp,
      mocked: !resendApiKey,
    });
  } catch (error) {
    console.error("[API /api/devis] Erreur interne:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur interne est survenue lors du traitement de votre demande de devis.",
      },
      { status: 500 }
    );
  }
}
