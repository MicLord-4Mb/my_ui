/*
 * UI generators
 * Vanilla JS + Bootstrap v5.3+
 */

let globalTheme = 'light';
let inputCounter = 0;
let toastContainer = null;

function createBaseElement(tag, props = {})
{
  const {text, className, children, theme, ...restProps} = props;

  const el = document.createElement(tag);

  if (className) el.className = className;
  if (text) el.textContent = text;

  if (theme && typeof theme === 'string') {
    el.setAttribute('data-bs-theme', theme);
  }

  for (const [key, value] of Object.entries(restProps)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.substring(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (typeof value === 'boolean') {
      el.toggleAttribute(key, value);
      if (key in el) {
        el[key] = value;
      }
    } else if (value !== undefined && value !== null) {
      if (key === 'value' || key === 'checked') {
        el[key] = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  if (children) {
    const childrenArray = Array.isArray(children) ? children : [children];

    // filtered null/undefined
    const validChildren = childrenArray.filter(child => child !== null && child !== undefined);
    el.append(...validChildren);
  }
  return el;
}

function getToastContainer() {
  toastContainer = createBaseElement('div', {
    className: 'toast-container position-fixed bottom-0 end-0 p-3',
    style: 'z-index: 1055;' // Bootstrap modal at #1050
  });
  document.body.append(toastContainer);
  return toastContainer;
}

// --- API ---
const MyUI = {
  setGlobalTheme (themeName) {
    if (themeName !== 'light' && themeName !== 'dark') return;

    globalTheme = themeName;
    document.documentElement.setAttribute('data-bs-theme', globalTheme);
    console.log(`[myUI] Global theme changed on: ${globalTheme}`);
  },

  getGlobalTheme () {
    return globalTheme;
  },

  toggleTheme () {
    const newTheme = globalTheme === 'light' ? 'dark' : 'light';
    this.setGlobalTheme(newTheme);
    return newTheme;
  },

  Tag(tagName, props) {
    return createBaseElement(tagName, props);
  },

  Button(props) {
    const { variant = 'primary', className, ...restProps } = props;
    const finalClass = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ');
    return createBaseElement('button', {...restProps, className: finalClass});
  },

  Input(props) {
    const { className, type = 'text', size, id, ...restProps } = props;

    if(!id) {
      inputCounter++;
    }

    const finalId = id || `ui-input-${inputCounter}`;
    let defClass = 'form-control';

    if (type === 'color') {
      defClass = 'form-control form-control-color';
    } else if (type === 'range') {
      defClass = 'form-range';
    } else if (props.readonly && props.plaintext) {
      defClass = 'form-control-plaintext';
    }

    const sizeClass = size ? `form-control-${size}` : '';
    const finalClass = [defClass, sizeClass, className].filter(Boolean).join(' ');
    return createBaseElement(
      'input',
      {
        ...restProps,
        type,
        id: finalId,
        className: finalClass
      });
  },

  Card(props) {
    const {title, content, meta, children, className, ...restProps} = props;

    const cardClass = `card h-100 ${className || ''}`.trim();

    const $card = createBaseElement('div', {...restProps, className: cardClass});
    const $cardBody = createBaseElement('div', {className: 'card-body d-flex flex-column'});

    if (meta) {
      $cardBody.append(createBaseElement('div', {
        text: meta,
        className: 'text-body-secondary small mb-2',
      }));
    }

    if (title) {
      $cardBody.append(createBaseElement('h5', {text: title, className: 'card-title'}));
    }

    if (content) {
      $cardBody.append(createBaseElement('p', {text: content, className: 'card-text'}));
    }

    if (children) {
      const childrenArray = Array.isArray(children) ? children : [children];
      const validChildren = childrenArray.filter(child => child !==null && child !== undefined);
      $cardBody.append(...validChildren);
    }

    $card.append($cardBody);
    return $card;
  },

  Modal(props) {
    const { id, title, body, footer, size = '', className, ...restProps } = props;

    const $header = createBaseElement('div', { className: 'modal-header' });
    if (title) {
      $header.append(createBaseElement('h5', { text: title, className: 'modal-title' }));
    }
    $header.append(createBaseElement('button', {
      type: 'button',
      className: 'btn-close',
      'data-bs-dismiss': 'modal',
      'aria-label': 'Close'
    }));

    const $body = createBaseElement('div', { className: 'modal-body' });
    if (body) {
      const bodyChildren = Array.isArray(body) ? body : [body];
      $body.append(...bodyChildren.filter(child => child !== null && child !== undefined));
    }

    const $content = createBaseElement('div', { className: 'modal-content' });
    $content.append($header, $body);

    if (footer) {
      const $footer = createBaseElement('div', { className: 'modal-footer' });
      const footerChildren = Array.isArray(footer) ? footer : [footer];
      $footer.append(...footerChildren.filter(child => child !== null && child !== undefined));
      $content.append($footer);
    }

    const $dialog = createBaseElement('div', { className: `modal-dialog ${size}`.trim() });
    $dialog.append($content);

    const modalClass = `modal fade ${className || ''}`.trim();
    const $modal= createBaseElement('div', {
      ...restProps,
      id: id,
      className: modalClass,
      tabindex: '-1',
      'aria-hidden': 'true',
      children: $dialog
    });

    $modal.addEventListener('hide.bs.modal', () => {
      if (document.activeElement && $modal.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });

    return $modal;
  }
};

export default MyUI;