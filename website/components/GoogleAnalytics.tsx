const GOOGLE_TAG_ID = "G-G01ETXS1PF";

const googleTagBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;

var charterxConsent = null;
try { charterxConsent = window.localStorage.getItem('charterx:consent:v1'); } catch (error) {}

gtag('consent', 'default', {
  analytics_storage: charterxConsent === 'accepted' ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

if (!window.location.pathname.startsWith('/admin')) {
  var charterxGoogleTag = document.createElement('script');
  charterxGoogleTag.async = true;
  charterxGoogleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}';
  document.head.appendChild(charterxGoogleTag);
  gtag('js', new Date());
  gtag('config', '${GOOGLE_TAG_ID}');
}
`;

export function GoogleAnalytics() {
  return (
    <script data-google-tag={GOOGLE_TAG_ID} dangerouslySetInnerHTML={{ __html: googleTagBootstrap }} />
  );
}
