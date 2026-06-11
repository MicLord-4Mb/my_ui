import MyUI from './utils/my_ui.js';

// Container to host all examples cleanly on the page
const rootContainer = MyUI.Tag('div', { className: 'container my-5' });
document.body.append(rootContainer);

// ==========================================
// 1. THEME MANAGEMENT & TAG METHOD
// ==========================================
const headerSection = MyUI.Tag('div', { className: 'mb-5 p-4 border rounded bg-light' });

const title = MyUI.Tag('h1', { text: 'My_UI Component Library Showcase', className: 'mb-3' });
const description = MyUI.Tag('p', {
  text: 'Demonstrating all components, configuration variants, and features.',
  className: 'text-muted'
});

const themeToggleBtn = MyUI.Button({
  text: 'Toggle Dark / Light Mode',
  variant: 'outline-dark',
  onClick: () => {
    const current = MyUI.toggleTheme();
    // Dynamically adjust button styling to match state
    themeToggleBtn.className = current === 'dark' ? 'btn btn-outline-light' : 'btn btn-outline-dark';
  }
});

headerSection.append(title, description, themeToggleBtn);
rootContainer.append(headerSection);


// ==========================================
// 2. BUTTON VARIANTS SHOWCASE
// ==========================================
const buttonSection = MyUI.Tag('div', { className: 'mb-5' });
buttonSection.append(MyUI.Tag('h3', { text: 'Buttons (Variants & States)', className: 'mb-3' }));

const buttonGroup = MyUI.Tag('div', { className: 'd-flex gap-2 flex-wrap' });

buttonGroup.append(
  MyUI.Button({ text: 'Primary Button', variant: 'primary' }),
  MyUI.Button({ text: 'Secondary Button', variant: 'secondary' }),
  MyUI.Button({ text: 'Success Button', variant: 'success' }),
  MyUI.Button({ text: 'Danger Button', variant: 'danger', className: 'shadow-sm' }),
  MyUI.Button({ text: 'Disabled Button', variant: 'info', disabled: true }),
  MyUI.Button({
    text: 'Click Action Test',
    variant: 'warning',
    onClick: () => alert('Button functionality works perfectly!')
  })
);

buttonSection.append(buttonGroup);
rootContainer.append(buttonSection);


// ==========================================
// 3. INPUT VARIANTS SHOWCASE
// ==========================================
const inputSection = MyUI.Tag('div', { className: 'mb-5' });
inputSection.append(MyUI.Tag('h3', { text: 'Inputs (Types & Sizes)', className: 'mb-3' }));

const inputForm = MyUI.Tag('div', { className: 'row g-3' });

// Text input variants (Sizes)
inputForm.append(
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Small Text Input' }),
      MyUI.Input({ type: 'text', size: 'sm', placeholder: 'Size small input...' })
    ]}),
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Default Text Input' }),
      MyUI.Input({ type: 'text', placeholder: 'Default size input...' })
    ]}),
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Large Text Input' }),
      MyUI.Input({ type: 'text', size: 'lg', placeholder: 'Size large input...' })
    ]})
);

// Special structural Inputs (Range, Color, Plaintext)
inputForm.append(
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Range Slider Input' }),
      MyUI.Input({ type: 'range', min: 0, max: 100, value: 75 })
    ]}),
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Color Picker Input', className: 'd-block' }),
      MyUI.Input({ type: 'color', value: '#0d6efd', title: 'Choose your color' })
    ]}),
  MyUI.Tag('div', { className: 'col-md-4', children: [
      MyUI.Tag('label', { text: 'Plaintext Readonly Input' }),
      MyUI.Input({ type: 'text', readonly: true, plaintext: true, value: 'readonly@example.com' })
    ]})
);

inputSection.append(inputForm);
rootContainer.append(inputSection);


// ==========================================
// 4. CARD COMPONENT SHOWCASE
// ==========================================
const cardSection = MyUI.Tag('div', { className: 'mb-5' });
cardSection.append(MyUI.Tag('h3', { text: 'Cards Structure', className: 'mb-3' }));

const cardRow = MyUI.Tag('div', { className: 'row' });

const demoCard = MyUI.Card({
  className: 'col-md-6 shadow-sm',
  meta: 'Project Management • Active',
  title: 'Interactive Feature Card',
  content: 'This card demonstrates metadata structural rendering, text contents injection, and custom nested DOM children elements handling layout features.',
  children: [
    MyUI.Tag('div', { className: 'mt-auto pt-3 border-top', children: [
        MyUI.Button({ text: 'Card Action', variant: 'outline-primary', size: 'sm' })
      ]})
  ]
});

cardRow.append(demoCard);
cardSection.append(cardRow);
rootContainer.append(cardSection);


// ==========================================
// 5. MODAL COMPONENT SHOWCASE
// ==========================================
const modalSection = MyUI.Tag('div', { className: 'mb-5' });
modalSection.append(MyUI.Tag('h3', { text: 'Modals (Bootstrap Trigger Engine)', className: 'mb-3' }));

// 5a. Create the Modal structural instance
const modalInstance = MyUI.Modal({
  id: 'showcaseModal',
  size: 'modal-md', // Options: modal-sm, modal-md, modal-lg, modal-xl
  title: 'Confirmation Action Dialog',
  body: [
    MyUI.Tag('p', { text: 'Are you completely sure you want to perform this operation?' }),
    MyUI.Tag('small', { text: 'This action will be traced down to execution logs.', className: 'text-danger' })
  ],
  footer: [
    MyUI.Button({
      text: 'Cancel Process',
      variant: 'secondary',
      'data-bs-dismiss': 'modal'
    }),
    MyUI.Button({
      text: 'Confirm & Proceed',
      variant: 'success',
      onClick: () => {
        console.log('Action successfully confirmed!');
        // Programmatically close using standard Bootstrap JS constructor if desired,
        // or let data-bs-dismiss on a button handle it.
      }
    })
  ]
});

// 5b. Create standard Button trigger mapping attributes
const modalTriggerBtn = MyUI.Button({
  text: 'Launch Live Showcase Modal',
  variant: 'primary',
  'data-bs-toggle': 'modal',
  'data-bs-target': '#showcaseModal'
});

modalSection.append(modalTriggerBtn, modalInstance);
rootContainer.append(modalSection);