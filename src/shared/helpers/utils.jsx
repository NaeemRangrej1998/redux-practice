import Cookies from 'universal-cookie';
const cookie = new Cookies();

function getSLD(url) {
    const parts = url.split('.'),
        sld = parts.slice(-2).join('.');
    return sld;
}

function removeCookie(name) {
    // return authorization header with jwt token
    cookie.remove(name, { httpOnly: false, path: '/', domain: getSLD(window.location.hostname) });
}
export { getSLD, removeCookie };
