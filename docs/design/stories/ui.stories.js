export default {
  title: "Primitives",
};

export const Buttons = () => `
  <div class="flow">
    <section class="flow">
      <h3>Solid</h3>
      <div class="cluster">
        <button class="button">Default</button>
        <button class="button" data-color="primary">Primary</button>
        <button class="button" data-color="secondary">Secondary</button>
        <button class="button" data-color="tertiary">Tertiary</button>
      </div>
    </section>
    <section class="flow">
      <h3>Ghost</h3>
      <div class="cluster">
        <button class="button" data-variant="ghost" data-color="primary">Ghost Primary</button>
        <button class="button" data-variant="ghost" data-color="secondary">Ghost Secondary</button>
        <button class="button" data-variant="ghost" data-color="tertiary">Ghost Tertiary</button>
      </div>
    </section>
    <section class="flow">
      <h3>Disabled</h3>
      <div class="cluster">
        <button class="button" disabled>Disabled</button>
      </div>
    </section>
  </div>
`;

export const Cards = () => `
  <article class="card" style="max-width: 20rem;">
    <h3 class="title">O nome da rosa</h3>
    <p class="body">Umberto Eco — planned</p>
    <footer class="footer">
      <div class="cluster">
        <button class="button">Detalhes</button>
      </div>
    </footer>
  </article>
`;

export const Fields = () => `
  <div class="flow" style="max-width: 20rem;">
    <div class="field">
      <label for="t">Title</label>
      <input id="t" type="text" placeholder="Book title" />
      <span class="hint">Required</span>
    </div>
    <div class="field">
      <label for="a">Author</label>
      <input id="a" type="text" placeholder="Author name" />
    </div>
    <div class="field">
      <label for="d">Description</label>
      <textarea id="d" placeholder="Optional description..."></textarea>
    </div>
    <div class="field">
      <label for="s">Reading state</label>
      <select id="s">
        <option>Planned</option>
        <option>Reading</option>
        <option>Finished</option>
        <option>On hold</option>
      </select>
    </div>
    <div class="field">
      <label>Collections</label>
      <div class="tagchecks">
        <label><input type="checkbox" /> Favorites</label>
        <label class="is-on"><input type="checkbox" checked /> Sci-fi</label>
      </div>
    </div>
  </div>
`;

export const Headings = () => `
  <div class="flow">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
  </div>
`;

