import type { App, DirectiveBinding } from 'vue';

interface HTMLElementPlus extends HTMLElement {
  disabled?: boolean;
}

const name = 'preventReClick';

const options = {
  mounted: function (el: HTMLElementPlus, binding: DirectiveBinding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 1000);
      }
    });
  },
};

export default function (app: App) {
  app.directive(name, options);
}
