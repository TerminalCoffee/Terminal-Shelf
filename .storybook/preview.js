import "../assets/css/tokens.css";
import "../assets/css/reset.css";
import "../assets/css/base.css";
import "../assets/css/layout.css";
import "../assets/css/components/button.css";
import "../assets/css/components/card.css";
import "../assets/css/components/field.css";

export const decorators = [
  (storyFn, context) => {
    const theme = context.globals?.theme || "light";
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
    return storyFn();
  },
];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Color scheme",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
      ],
    },
  },
};