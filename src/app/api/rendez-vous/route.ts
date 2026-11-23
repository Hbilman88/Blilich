import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pole,
      format,
      villeChantier,
      adresseChantier,
      date,
      creneau,
      nom,
      societe,
      fonction,
      telephone,
      email,
      description,
      filesInfo,
    } = body;

    // Validation
    if (!pole || !format || !date || !creneau || !nom || !telephone || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Veuillez renseigner tous les champs obligatoires (pôle, format, date, créneau, nom, téléphone, e-mail).",
        },
        { status: 400 }
      );
    }

    // Generate reference code RDV-MOC-2026-XXXX
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reference = `RDV-MOC-2026-${randomCode}`;

    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Africa/Casablanca",
      dateStyle: "full",
      timeStyle: "short",
    });

    console.log(`[API /api/rendez-vous] Nouvelle demande enregistrée: ${reference}`, {
      reference,
      timestamp,
      pole,
      format,
      villeChantier,
      date,
      creneau,
      nom,
      societe,
      telephone,
      email,
    });

    // Check for Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0B1120; color: #ffffff; padding: 24px; border-bottom: 3px solid #007A63;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700;">GROUPE MOCOMEL — DEMANDE DE RENDEZ-VOUS AVANT-VENTE</h2>
              <p style="margin: 6px 0 0; color: #94A3B8; font-size: 13px;">Réf: <strong>${reference}</strong> | Reçu le: ${timestamp}</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <h3 style="color: #0B1120; font-size: 16px; margin-top: 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">1. Coordonnées Client</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Nom:</strong> ${nom}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Société:</strong> ${societe || "Non précisée"}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Fonction:</strong> ${fonction || "Non précisée"}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Téléphone:</strong> <a href="tel:${telephone}" style="color: #007A63; font-weight: 600;">${telephone}</a></p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #007A63;">${email}</a></p>

              <h3 style="color: #0B1120; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">2. Paramètres du Rendez-vous</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Pôle / Nature du besoin:</strong> ${pole}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Format souhaité:</strong> ${format}</p>
              ${villeChantier ? `<p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Lieu / Ville du chantier:</strong> ${villeChantier} ${adresseChantier ? `(${adresseChantier})` : ""}</p>` : ""}
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Date demandée:</strong> ${date}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Créneau horaire:</strong> ${creneau}</p>

              <h3 style="color: #0B1120; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">3. Détails & Pièces Jointes</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Description du projet:</strong></p>
              <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px; color: #1e293b; border: 1px solid #e2e8f0; margin-top: 6px; white-space: pre-wrap;">${description || "Aucune note particulière."}</div>
              ${filesInfo && filesInfo.length > 0 ? `
                <p style="margin: 12px 0 6px; font-size: 14px; color: #334155;"><strong>Fichiers techniques annoncés (${filesInfo.length}):</strong></p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #64748b;">
                  ${filesInfo.map((f: { name: string; size: string }) => `<li>${f.name} (${f.size})</li>`).join("")}
                </ul>
              ` : `<p style="margin: 12px 0 0; font-size: 13px; color: #94a3b8;"><em>Aucun fichier technique attaché.</em></p>`}
            </div>
            <div style="background-color: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
              Groupe MOCOMEL SARL · Tit Mellil & Sidi Moumen, Casablanca · Téléphone: 0665 922 500 · mocomel.sarl@gmail.com
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
            from: "MOCOMEL Portail <contact@mocomel.ma>",
            to: ["mocomel.sarl@gmail.com"],
            reply_to: email,
            subject: `[MOCOMEL RDV ${reference}] Demande de RDV - ${societe || nom} (${pole})`,
            html: emailHtml,
          }),
        });
      } catch (err) {
        console.warn("[API /api/rendez-vous] Envoi Resend échoué, poursuite normale:", err);
      }
    }

    return NextResponse.json({
      success: true,
      reference,
      message: "Votre demande de rendez-vous a été enregistrée avec succès. Un ingénieur chef de projet prendra contact avec vous sous 24h ouvrées.",
      timestamp,
      mocked: !resendApiKey,
    });
  } catch (error) {
    console.error("[API /api/rendez-vous] Erreur interne:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur interne est survenue lors du traitement de votre demande.",
      },
      { status: 500 }
    );
  }
}
