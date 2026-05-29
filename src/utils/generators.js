/*
 * UI generators
 * jQuery + bootstrap v5.3+
 */

const MyUI = (function($) {
  let globalTheme = 'light';

  function createBaseElement(tag, props = {}) {
    const { text, className, onClick, children, theme, ...restProps } = props;

    const $el=$(`<${tag}>`, restProps);

    if (className) $el.addClass(className);

    if (text) $el.text(text);

    if (onClick && typeof onClick === 'function') $el.on('click', onClick);

    if (theme && typeof theme === 'string') {
      $el.attr('data-bs-theme', theme);
    }

    if (children) {
      $el.append(children);
    }

    return $el;
  }

  // --- API ---
  return {
    setGlobalTheme: function (themeName) {
      if (themeName !== 'light' && themeName !== 'dark') return;

      globalTheme = themeName;
      $('html').attr('data-bs-theme', globalTheme);
      console.log(`[myUI] Global theme changed on: ${globalTheme}`);
    },

    getGlobalTheme: function() {
      return globalTheme;
    },

    toggleTheme: function() {
      const newTheme = globalTheme === 'light' ? 'dark' : 'light';
      this.setGlobalTheme(newTheme);
      return newTheme;
    },

    Tag: function (tagName, props) {
      return createBaseElement(tagName, props);
    },

    Button: function(props) {
      const defClass = 'btn btn-primary';
      const className = props.className ? `${defClass} ${props.className}`: defClass;
      return createBaseElement('button', {...props, className});
    },

    Input: function (props) {
      const defClass = 'form-control';
      const className = props.className ? `${defClass} ${props.className}` : defClass;
      return createBaseElement('input', {...props, className});
    },

    Card: function (props) {

      // как сделать карточку уникальной ... чтобы не тащить всю цепочку наследования внутрь...
      const defClass = 'card';
      const className = props.className ? `${defClass} ${props.className}` : defClass;

      const $card = createBaseElement('div', { ...props, className: className });
      const $cardBody = createBaseElement('div', {className: `card-body` });

      if (props.title){
        $cardBody.append(createBaseElement('h3', {text: props.title, className: `card-title`}));
      }

      if (props.content){
        $cardBody.append(createBaseElement('p', {text: props.content, className: `card-text`}));
      }

      if (props.children) {
        $cardBody.append(props.children);
      }

      $card.append($cardBody);

      return $card;
    }

  };
})(window.$);

export default MyUI;
