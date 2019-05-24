import { html, render } from './node_modules/lit-html/lit-html.js';
import { until } from './node_modules/lit-html/directives/until.js';


const getCharacter = (id) =>
    fetch(`https://swapi.co/api/people/${id}`).then(r => r.json());

const el = document.querySelector('[data-starwars-char]')


const charCardComponent = (data) => html`
    <h1>${data.name}</h1>
    <p>${data.birth_year}</p>
`;


const charContainerComponent = (data) => {
    return html`
    <div class="card">
        ${until(
        data.then(charCardComponent),
        html`Loading...`
      )}
    </div>
  `
};

render(charContainerComponent(getCharacter(el.dataset.starwarsChar)), el);

const starWarsCharObserver = new MutationObserver(function (mutations) {
    const m = mutations[0];
    const charId = m.target.getAttribute(m.attributeName);
    render(charContainerComponent(getCharacter(charId)), el);
});

starWarsCharObserver.observe(el, {
    attributes: true,
    attributeFilter: ['data-starwars-char']
});