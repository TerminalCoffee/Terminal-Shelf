export default {
  title: "Design/Tokens",
  tags: ["autodocs"],
};

const swatch = (token) => `
  <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2);">
    <span style="width:2rem;height:2rem;border-radius:0.25rem;background:var(${token});border:1px solid var(--border-subtle);"></span>
    <code>${token}</code>
  </div>
`;

export const ColorTokens = {
  render: () => {
    const tokens = [
      "--surface-default",
      "--surface-subtle",
      "--surface-inverse",
      "--surface-brand",
      "--surface-accent",
      "--text-on-default",
      "--text-on-subtle",
      "--text-on-inverse",
      "--text-on-brand",
      "--text-on-accent",
      "--border-subtle",
      "--border-strong",
      "--surface-brand-hover",
      "--surface-accent-hover",
    ];
    return `<div class="grid">${tokens.map(swatch).join("")}</div>`;
  },
};
