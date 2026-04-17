const BASE_URL = "https://photography-psi-sage.vercel.app";

const BUDGET_LABELS: Record<string, string> = {
  starter: "Starter — $100",
  signature: "Signature — $500",
  premium: "Premium — $1,000",
};

const PACKAGE_DETAILS: Record<string, { items: string[]; tag: string }> = {
  starter: {
    tag: "Photography + Videography",
    items: [
      "1-hour session",
      "20 professionally edited photos",
      "60-sec cinematic highlight reel",
      "2 outfit changes",
      "Basic color grading",
      "Digital delivery gallery",
    ],
  },
  signature: {
    tag: "Photography + Videography",
    items: [
      "3-hour session",
      "60 professionally edited photos",
      "3-min cinematic short film",
      "Unlimited outfit changes",
      "2 locations",
      "Advanced color grade & retouch",
      "Print-ready files + online gallery",
      "Social media content cuts",
    ],
  },
  premium: {
    tag: "Photography + Videography",
    items: [
      "Full-day session (6+ hrs)",
      "120+ professionally edited photos",
      "5-min cinematic film + social cut",
      "Unlimited outfits & looks",
      "Up to 3 locations",
      "Premium grade & full retouching",
      "USB + print-ready + online gallery",
      "Social content suite (5+ cuts)",
      "72-hr priority delivery",
    ],
  },
};

export type InquiryData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export function adminEmailHtml(data: InquiryData): string {
  const budgetLabel = BUDGET_LABELS[data.budget] ?? data.budget;
  const pkg = PACKAGE_DETAILS[data.budget];
  const packageItemsHtml = pkg
    ? pkg.items
        .map(
          (item) =>
            `<tr><td style="padding:3px 0;font-family:'Host Grotesk',Arial,sans-serif;font-size:12px;color:#aaaaaa;">◆&nbsp;&nbsp;${escapeHtml(item)}</td></tr>`,
        )
        .join("")
    : "";
  const receivedAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Booking Inquiry</title>
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#111111;font-family:'Host Grotesk',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111111;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#1a1a1a;border:1px solid #2e2e2e;padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0;font-family:Impact,Arial,sans-serif;font-size:22px;letter-spacing:0.06em;text-transform:uppercase;color:#f3f3f3;">MADE INVINCIBLE</p>
                  <p style="margin:6px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#666666;">PHOTOGRAPHY &amp; FILM STUDIO</p>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block;background-color:#ff564a;color:#ffffff;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;padding:5px 10px;">NEW INQUIRY</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero image strip -->
        <tr>
          <td style="padding:0;">
            <img src="${BASE_URL}/Archive-web/Studio/DSC03283.jpg" width="600" alt="Studio" style="display:block;width:100%;max-width:600px;height:220px;object-fit:cover;filter:brightness(0.7);" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#1a1a1a;border:1px solid #2e2e2e;border-top:none;padding:36px;">

            <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#555555;">BOOKING INQUIRY RECEIVED</p>
            <p style="margin:0 0 32px;font-family:Impact,Arial,sans-serif;font-size:32px;letter-spacing:-0.02em;text-transform:uppercase;color:#f3f3f3;line-height:1;">A NEW CLIENT<br/>WANTS TO WORK WITH YOU.</p>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background-color:#2e2e2e;"></td></tr>
            </table>

            <!-- Details rows -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #252525;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;">CLIENT NAME</p>
                  <p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:16px;color:#f3f3f3;font-weight:500;">${escapeHtml(data.name)}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #252525;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;">EMAIL ADDRESS</p>
                  <p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:16px;color:#f3f3f3;font-weight:500;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color:#ff564a;text-decoration:none;">${escapeHtml(data.email)}</a>
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #252525;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%">
                        <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;">PROJECT TYPE</p>
                        <p style="margin:0;font-family:Impact,Arial,sans-serif;font-size:15px;letter-spacing:0.04em;text-transform:uppercase;color:#f3f3f3;">${escapeHtml(data.projectType)}</p>
                      </td>
                      <td width="50%" valign="top">
                        <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;">PACKAGE SELECTED</p>
                        <p style="margin:0 0 6px;font-family:'Host Grotesk',Arial,sans-serif;font-size:15px;color:#f3f3f3;font-weight:500;">${escapeHtml(budgetLabel)}</p>
                        ${pkg ? `<table cellpadding="0" cellspacing="0" border="0">${packageItemsHtml}</table>` : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0 0;">
                  <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;">CLIENT BRIEF</p>
                  <p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:14px;line-height:1.65;color:#aaaaaa;">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
                </td>
              </tr>

            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:36px;">
              <tr>
                <td>
                  <a href="mailto:${escapeHtml(data.email)}?subject=Re%3A%20Your%20Made%20Invincible%20Inquiry" style="display:inline-block;background-color:#f3f3f3;color:#1a1a1a;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">REPLY TO CLIENT ↗</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;background-color:#111111;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3a3a3a;">MADE INVINCIBLE © 2024</p>
                </td>
                <td align="right">
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3a3a3a;">${receivedAt}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function clientEmailHtml(data: InquiryData): string {
  const budgetLabel = BUDGET_LABELS[data.budget] ?? data.budget;
  const pkg = PACKAGE_DETAILS[data.budget];
  const packageItemsHtml = pkg
    ? pkg.items
        .map(
          (item) =>
            `<tr><td style="padding:3px 0;font-family:'Host Grotesk',Arial,sans-serif;font-size:12px;color:#666666;">◆&nbsp;&nbsp;${escapeHtml(item)}</td></tr>`,
        )
        .join("")
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>We received your inquiry — Made Invincible</title>
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#e8e8e8;font-family:'Host Grotesk',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8e8e8;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- Top nav bar -->
        <tr>
          <td style="background-color:#f3f3f3;border:1px solid rgba(0,0,0,0.08);border-bottom:none;padding:18px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="${BASE_URL}" style="font-family:Impact,Arial,sans-serif;font-size:18px;letter-spacing:0.06em;text-transform:uppercase;color:#202020;text-decoration:none;">MADE INVINCIBLE</a>
                </td>
                <td align="right" valign="middle">
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#aaaaaa;">PHOTOGRAPHY &amp; FILM STUDIO</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero image -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="${BASE_URL}/intro-poster.jpg" width="600" alt="Made Invincible" style="display:block;width:100%;max-width:600px;height:280px;object-fit:cover;object-position:center 30%;" />
          </td>
        </tr>

        <!-- Main body -->
        <tr>
          <td style="background-color:#f3f3f3;border:1px solid rgba(0,0,0,0.08);border-top:none;padding:40px 36px 36px;">

            <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#aaaaaa;">INQUIRY RECEIVED</p>
            <p style="margin:0 0 20px;font-family:Impact,Arial,sans-serif;font-size:42px;letter-spacing:-0.03em;text-transform:uppercase;color:#202020;line-height:0.9;">WE'LL BE IN<br/>TOUCH SHORTLY.</p>

            <p style="margin:0 0 32px;font-family:'Host Grotesk',Arial,sans-serif;font-size:15px;line-height:1.7;color:#666666;max-width:46ch;">
              Hi ${escapeHtml(data.name)}, thanks for reaching out. We've received your brief and a member of the studio will review it personally and respond within two business days.
            </p>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background-color:rgba(0,0,0,0.1);"></td></tr>
            </table>

            <!-- Inquiry summary -->
            <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#aaaaaa;">YOUR INQUIRY SUMMARY</p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ebebeb;border:1px solid rgba(0,0,0,0.07);">

              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid rgba(0,0,0,0.07);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="40%"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#aaaaaa;">PROJECT</p></td>
                      <td><p style="margin:0;font-family:Impact,Arial,sans-serif;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;color:#202020;">${escapeHtml(data.projectType)}</p></td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid rgba(0,0,0,0.07);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="40%" valign="top"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#aaaaaa;">PACKAGE</p></td>
                      <td valign="top">
                        <p style="margin:0 0 6px;font-family:'Host Grotesk',Arial,sans-serif;font-size:14px;color:#202020;font-weight:500;">${escapeHtml(budgetLabel)}</p>
                        ${pkg ? `<p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#aaaaaa;">${escapeHtml(pkg.tag)}</p><table cellpadding="0" cellspacing="0" border="0">${packageItemsHtml}</table>` : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="40%" valign="top"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#aaaaaa;">YOUR BRIEF</p></td>
                      <td><p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:13px;line-height:1.6;color:#555555;">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p></td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>

            <!-- What's next -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
              <tr><td style="height:1px;background-color:rgba(0,0,0,0.1);margin-bottom:24px;"></td></tr>
            </table>
            <p style="margin:20px 0 12px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#aaaaaa;">WHAT HAPPENS NEXT</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="28" valign="top"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#aaaaaa;">01</p></td>
                      <td><p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:13px;color:#555555;line-height:1.5;">We review your brief and project details.</p></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="28" valign="top"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#aaaaaa;">02</p></td>
                      <td><p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:13px;color:#555555;line-height:1.5;">We reach back out to you within two business days.</p></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="28" valign="top"><p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#aaaaaa;">03</p></td>
                      <td><p style="margin:0;font-family:'Host Grotesk',Arial,sans-serif;font-size:13px;color:#555555;line-height:1.5;">We align on vision, scope, and timeline — then we create.</p></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Portfolio strip -->
        <tr>
          <td style="padding:2px 0 0;line-height:0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="33%" style="padding:0 1px 0 0;line-height:0;">
                  <img src="${BASE_URL}/Archive-web/NYC/DSC01390.jpg" width="198" alt="NYC" style="display:block;width:100%;height:140px;object-fit:cover;" />
                </td>
                <td width="34%" style="padding:0 1px;line-height:0;">
                  <img src="${BASE_URL}/Archive-web/Beach/DSC03167.jpg" width="200" alt="Beach" style="display:block;width:100%;height:140px;object-fit:cover;" />
                </td>
                <td width="33%" style="padding:0 0 0 1px;line-height:0;">
                  <img src="${BASE_URL}/Archive-web/Studio/DSC03283.jpg" width="198" alt="Studio" style="display:block;width:100%;height:140px;object-fit:cover;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#202020;padding:22px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="${BASE_URL}" style="font-family:Impact,Arial,sans-serif;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;color:#f3f3f3;text-decoration:none;">MADE INVINCIBLE</a>
                  <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#555555;">PHOTOGRAPHY &amp; FILM STUDIO © 2024</p>
                </td>
                <td align="right" valign="middle">
                  <a href="${BASE_URL}/the-archive" style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#666666;text-decoration:none;">VIEW ARCHIVE →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
