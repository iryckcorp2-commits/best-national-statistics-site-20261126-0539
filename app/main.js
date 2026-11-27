// NusaStat router: hash routes, one page per route.
// Reads location.hash, renders the matching view into #app, marks the
// active nav link, updates the document title and wires the page's
// controls. Unknown routes fall back to the home page.

import { ROUTES, bindPage } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];
const year = document.getElementById('year');

if (year) year.textContent = String(new Date().getFullYear());

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).split('?')[0];
  return ROUTES[path] ? path : '/';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  app.innerHTML = page.render();
  document.title = `${page.title} — NusaStat · Statistik Indonesia`;
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').slice(1);
    a.classList.toggle('active', target === route);
    if (target === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  bindPage(route);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
