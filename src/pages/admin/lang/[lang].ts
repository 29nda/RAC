import type { APIRoute } from 'astro';

export const prerender = false;

/** Switches the dashboard interface language and returns the editor to work. */
export const GET: APIRoute = ({ params, cookies, request, redirect }) => {
  const lang = params.lang === 'en' ? 'en' : 'id';
  cookies.set('rac_admin_lang', lang, {
    path: '/admin',
    httpOnly: false,
    sameSite: 'lax',
    secure: new URL(request.url).protocol === 'https:',
    maxAge: 60 * 60 * 24 * 365,
  });

  const referer = request.headers.get('Referer');
  let back = '/admin';
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin && url.pathname.startsWith('/admin')) {
        back = url.pathname + url.search;
      }
    } catch { /* fall back to the dashboard root */ }
  }
  return redirect(back, 302);
};
