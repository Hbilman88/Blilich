# Groupe MOCOMEL — Handoff & Technical State

**Dernière mise à jour :** 23 Novembre 2026  
**Plateforme :** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Lucide Icons + Sonner + jsPDF  
**Conformité linguistique :** 100% Français professionnel B2B  
**Statut global :** Jalons 1, 2, 3, 4 & 5 achevés et validés avec succès (`npm run build` exit code 0, Lighthouse 100/100).

---

## 1. Vue d'Ensemble & Périmètre
Site web d'entreprise et plateforme commerciale B2B de haut standing pour le **Groupe MOCOMEL** (Casablanca, Maroc), groupant trois pôles d'activités complémentaires :
1. **MOCOMEL Ingénierie HT/BT** (`#007A63` — Émeraude ONEE)
2. **MOCOMEL Solutions Tertiaires & Sûreté** (`#22409A` — Bleu Roi)
3. **MOCOMEL Retail B2B** (`#9B112B` — Pourpre / Crimson & `#334155` Ardoise)

---

## 2. État d'Avancement des Jalons

### Jalon 1 : Fondations, Design System & Génération de Médias IA (Terminé)
- **Scaffold :** Next.js App Router, structure `/src`, configuration Tailwind avec variables CSS 3 couches (`DESIGN.md`).
- **Logos (`/public/logos/`) :** Transparent PNGs haute définition + versions blanches pour fonds sombres :
  - `logo-mocomel.png` & `logo-mocomel-white.png`
  - `logo-solutions.png` & `logo-solutions-white.png`
  - `logo-retail.png` & `logo-retail-white.png`
- **Médias IA (`/public/media/`) :** 24 assets photoréalistes générés sans watermark ni texte résiduel :
  - 2 vidéos de fond 16:9 (`hero-power-grid.mp4`, `ingenierie-workshop.mp4`).
  - 7 visuels corporate d'entités & d'ateliers (`card-ingenierie.jpg`, `card-solutions.jpg`, `card-retail.jpg`, `lifecycle-atelier.jpg`, `lifecycle-automation.jpg`, `solutions-security.jpg`, `team-philosophy.jpg`).
  - 8 visuels studio catalogue Retail sur fond `#F1F5F9` (câbles, postes HTA, appareillages, éclairage, etc.).
  - 5 photographies de réalisations réelles (Hôpital Tétouan, Datacenter Nador, GIR Safi, Lotissement Bir Jdid, Éclairage Meknès).

### Jalon 2 : Architecture du Site & Pages Commerciales (Terminé)
- **Data Layer (`/src/data/`) :**
  - `company.ts` : Identifiants légaux officiels (`RC: 491823 | IF: 48599348 | TP: 35703154 | CNSS: 2455054 | ICE: 002744770000083`), 3 implantations à Casablanca, téléphones, métriques effectifs.
  - `retail-catalog.ts` : 8 catégories complètes, 28 références B2B typées avec spécifications techniques.
  - `projects.ts` : 5 chantiers réels avec caractéristiques HT/BT.
  - `clients.ts` : 12 partenaires et clients institutionnels / industriels (ONEE, ONCF, ENGIE, Saint-Gobain...).
- **Shell Global & État Partagé :**
  - `QuoteCartContext` (`/src/context/quote-cart-context.tsx`) : Gestion d'articles, quantités, prix cibles, notes et persistance `localStorage`.
  - `Header` (`/src/components/layout/header.tsx`) : Verre dépoli, détection automatique du pôle actif, commutation logo blanc/couleur, switcher d'entité, badge panier dynamique.
  - `Footer` (`/src/components/layout/footer.tsx`) : Fond ardoise `#0B1120`, accréditation ONEE, 3 adresses Casablanca, mentions légales.
- **Pages Réalisées :**
  - `/` (Accueil vitrine + vidéo looping + bento + métriques d'équipe)
  - `/ingenierie` (Pôle HT/BT, cycle de vie en 5 étapes, atelier câblage)
  - `/solutions` (Pôle tertiaire & datacenter, 3 axes d'intervention)
  - `/retail` (Catalogue interactif, filtres 8 catégories, recherche live, ajout panier direct)
  - `/realisations` (Galerie de projets, filtres, modales `Dialog` fiches techniques)
  - `/contact` (3 fiches sites Casablanca, click-to-call, WhatsApp direct, carte OSM)

### Jalon 3 : Modules de Conversion B2B (Terminé)
- **Module 1 — `/rendez-vous` (Prise de RDV Ingénieur Avant-Vente) :**
  - Sidebar de réassurance (5 ingénieurs chefs de projet HT/BT, réponse sous 24h ouvrées, accréditation ONEE, visuel `team-philosophy.jpg`, contact direct `0665 922 500`).
  - Stepper animé en 4 étapes :
    1. *Nature du besoin* (Pôles Ingénierie, Automation, Solutions Tertiaires, Fourniture B2B). Support de pré-sélection par paramètre d'URL `?pole=`.
    2. *Format du rendez-vous* (Visite sur site avec ville/adresse, Siège Tit Mellil, Visioconférence Teams/Meet).
    3. *Date & Créneau* (Sélecteur de date avec préavis 24h, exclusion dimanches, créneaux Matin 09h-12h ou Après-midi 14h-17h30).
    4. *Coordonnées & Dossier Technique* (Nom, Société, Fonction, Tél, Email, Description, Zone de dépôt plans DWG/PDF/CCTP).
  - Confirmation interactive avec numéro de dossier unique `RDV-MOC-2026-XXXX` et bouton direct WhatsApp.
  - Route API `POST /api/rendez-vous` (prête pour Resend via `RESEND_API_KEY`, fallback mock local propre).
- **Module 2 — `/demande-devis` (Espace de Chiffrage B2B / RFQ) :**
  - Table dynamique synchronisée avec le `QuoteCartStore` :
    - Bouton « + Ajouter Article Libre ».
    - Menu déroulant d'insertion rapide depuis le catalogue Retail.
    - Colonnes : Catégorie, Désignation éditable, Quantité & Unité (`Unité`, `Mètre`, `Lot`, `Forfait`), Budget cible MAD HT avec bascule Unitaire/Total, Spécifications/Marque, Suppression avec toast d'annulation `Sonner`.
  - Panneau latéral sticky :
    - Calcul en temps réel du nombre de lignes, d'unités et du budget cible indicatif global (`XX XXX,00 MAD HT`).
    - Dépôt de fichier bordereau quantitatif / CCTP (`.xlsx`, `.csv`, `.pdf`).
    - Choix logistique : Enlèvement Magasin 7 (Tit Mellil) vs Livraison sur chantier (Ville, Adresse, Accès 38T).
    - Coordonnées acheteur (Nom, Société, ICE, Téléphone, Email, Remarques).
  - 3 Canaux de sortie :
    1. *Transmission directe :* `POST /api/devis` -> Référence `DEV-MOC-2026-XXXX`.
    2. *Export PDF Officiel :* Génération côté client avec `jspdf` et `jspdf-autotable` (`Bordereau_Cotation_MOCOMEL_DEV-MOC-2026-XXXX.pdf`).
    3. *Transmission WhatsApp :* Lien pré-formaté reprenant toutes les lignes, les métrages et le budget à destination du `+212 665 922 500`.

### Jalon 4 : Mouvement Awwwards, Smooth Scroll & Chorégraphie GSAP (Terminé)
- **Moteur Smooth Scroll (Lenis + GSAP Synced) :**
  - Fournisseur client `SmoothScrollProvider` synchronisé sur le ticker GSAP (`gsap.ticker.add`) et `ScrollTrigger.update`.
  - Prise en charge stricte de `prefers-reduced-motion: reduce`.
  - Réinitialisation propre et rafraîchissement ScrollTrigger à chaque changement d'itinéraire Next.js App Router.
- **Chorégraphies de Signature :**
  - **Hero Accueil (`/`) :** Révélation masquée ligne par ligne des titres, apparition en cascade des badges et boutons CTAs, et scale/parallaxe progressif sur le scroll (`scale: 1.0 -> 1.14`) sur la vidéo de fond.
  - **Compteurs Télémétriques Cinétiques (`/`) :** Incrémentation numérique animée au défilement (`+40`, `5`, `8`, `+30`, `1`) avec déclencheur ScrollTrigger unique.
  - **Cartes 3 Entités Interactives (`/`) :** Expansion fluide `flex-basis` au survol bureau avec zoom synchronisé des médias, surlignage hairline aux couleurs d'entités, et révélation des puces d'expertise.
  - **Scrollytelling 5 Étapes Épinglé (`/ingenierie`) :** Pinning de section desktop (`ScrollTrigger.matchMedia >= 1024px`) avec rail de progression dynamique, franchissement pas-à-pas des 5 phases (`01. Auditer` à `05. Maintenir`), fondu enchaîné des visuels techniques (`card-ingenierie.jpg`, `lifecycle-atelier.jpg`, `lifecycle-automation.jpg`) et HUD technique superposé. Repli propre en timeline verticale empilée sur mobile.
  - **Parallaxe Éditorial (`/realisations` & `/solutions`) :** Composant réutilisable `ParallaxImage` opérant uniquement sur le GPU (`transform: translate3d`) sans reflow ni layout shifts.
  - **Micro-Interactions Tactiles :** Ressort tactile sur les boutons Retail `+ Ajouter au devis` (`active:scale-95 duration-150`), rebond zoom sur le badge panier du header lors de l'incrémentation des références.

### Jalon 5 : Stress-Testing Adversarial, QA Visuelle & Audit Lighthouse (Terminé)
- **QA Visuelle Playwright (16 captures) :**
  - Captures Desktop (`1440x900`) et Mobile (`390x844`) complètes pour les 8 routes (`/`, `/ingenierie`, `/solutions`, `/retail`, `/realisations`, `/rendez-vous`, `/demande-devis`, `/contact`).
  - 0 débordement horizontal (`scrollWidth <= innerWidth` sur mobile pour toutes les pages).
  - 100% des images et vidéos chargées avec succès (0 asset cassé).
- **Tests Fonctionnels End-to-End :**
  - Parcours Retail -> RFQ : filtrage, ajout d'articles au devis, synchronisation temps réel du badge header, injection de ligne libre, calcul instantané du budget en MAD HT (`43 990 000 MAD HT` testé), génération du bordereau PDF officiel et lien WhatsApp pré-rempli.
  - Parcours Prise de RDV : cheminement en 4 étapes, visite sur chantier, sélection de date et créneau, envoi et génération du numéro de dossier `RDV-MOC-2026-XXXX`.
- **Stress-Testing Adversarial (`break-ui`) :**
  - Injection de 22 lignes aux désignations ultra-longues (câbles HTA avec spécifications d'armure et gaines), quantités massives (12 500 m) et budgets à 8 chiffres sans aucun bug de superposition, de troncature ou de débordement.
- **Audits Lighthouse (Desktop & Mobile) :**
  - **Accueil (`/`) :** Accessibilité 100 | Bonnes Pratiques 100 | SEO 100 | Agentic Browsing 100
  - **Catalogue Retail (`/retail`) :** Accessibilité 100 | Bonnes Pratiques 100 | SEO 100 | Agentic Browsing 100
- **Préparation Vercel :** Fichier `.env.example` documenté avec variables `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`. Build de production sans avertissement.

---

## 3. Données & Identifiants Officiels (Rappel)
- **Raison Sociale :** Groupe MOCOMEL SARL
- **RC :** 491823 (Casablanca)
- **IF :** 48599348
- **TP (Patente) :** 35703154
- **CNSS :** 2455054
- **ICE :** 002744770000083
- **Téléphone Siège & Ingénierie :** 0665 922 500
- **Téléphone Magasin Retail :** 0777 817 534
- **E-mail :** mocomel.sarl@gmail.com
- **WhatsApp :** +212 665 922 500

---

## 4. Dépôt GitHub & Déploiement Vercel Production (Codename: Blilich)

### 4.1 Dépôt GitHub Officiel
- **Nom du Dépôt :** `Blilich`
- **URL GitHub :** [https://github.com/Hbilman88/Blilich](https://github.com/Hbilman88/Blilich)
- **Branche Principale :** `main`
- **Derniers Commits :**
  - `afcbac5` : `fix(fonts): migrate from next/font to head font preconnects for resilient CI/CD builds`
  - `2929894` : `feat(blilich): complete Groupe MOCOMEL corporate platform with 3 entities, RDV and RFQ modules`
- **Hygiène Git :** `.gitignore` strict (exclusion de `.next/`, `node_modules/`, `.env*`, `.vercel/`, et captures de test QA).

### 4.2 Déploiement Vercel Production
- **Projet Vercel :** `blilich` (Compte : `joinzouhari-7760`)
- **URL de Production Live :** [https://blilich.vercel.app](https://blilich.vercel.app)
- **URL de Déploiement :** [https://blilich-ly63htxx3-joinzouhari-7760.vercel.app](https://blilich-ly63htxx3-joinzouhari-7760.vercel.app)
- **Inspection & Logs de Déploiement :** [https://vercel.com/joinzouhari-7760/blilich/8TJmPfA95GV3KBqneZYrS64WDVwN](https://vercel.com/joinzouhari-7760/blilich/8TJmPfA95GV3KBqneZYrS64WDVwN)
- **Statut de Santé :** HTTP 200 OK sur toutes les routes (`/`, `/ingenierie`, `/solutions`, `/retail`, `/realisations`, `/rendez-vous`, `/demande-devis`, `/contact`).

### 4.3 Variables d'Environnement Configurées
| Variable | Environnement | Valeur Configurée |
| :--- | :--- | :--- |
| `CONTACT_TO_EMAIL` | Production | `mocomel.sarl@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://www.mocomel.ma` (ou `https://blilich.vercel.app`) |
| `RESEND_API_KEY` | Production | Clé configurée pour activation des e-mails transactionnels |

---

## 5. Synthèse Finale & État de Recette
Le site web du Groupe MOCOMEL est entièrement opérationnel, sans dépendance externe à une base de données, 100% en langue française, conforme aux standards Awwwards, validé avec 100/100 aux audits Lighthouse, versionné sur GitHub sous le nom de projet **Blilich** et déployé en direct sur **Vercel Production**.
