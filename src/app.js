import MyUI from "./utils/generators.js";

$(document).ready(function () {

  MyUI.setGlobalTheme('light');

  const $themeToggleBtn = MyUI.Button({
    text: 'Theme Switch',
    className: 'button-secondary mb-4',
    onClick: function () {
      const currentTheme = MyUI.toggleTheme();
      $(this).text(currentTheme === 'dark' ? 'Turn light on' : 'Turn light off');
    }
  });

  const $input = MyUI.Input({
    type: 'text',
    id: 'inputName',
    placeholder: 'Enter your Name',
    className: 'mb-3'
  });

  const $testCard = MyUI.Card({
    title: 'Test Card',
    content: 'Content of this Card',
    id: 'testCard',
    children: [$input]
  })

  const $testCard2 = MyUI.Card({
    title: 'Test Card2',
    content: 'Content of this Card',
    id: 'testCard2',
  })

  const $testCardTree = MyUI.Card({
    title: 'Card Tree 1',
    content: 'Content of TreeCard',
    className: 'mt-6',
    id: 'testCardTree1',
    children: [$testCard2, $testCard]
  })

  // Так в обертке показывает 2 карточки
  // $('#app').append(
  //   $themeToggleBtn,
  //   $testCardTree
  // );

  // Так не показывается в обертке $testCard ... Huston we got a problem!!!
  $('#app').append(
    $themeToggleBtn,
    $testCard,
    $testCardTree
  );

  $input.focus();
})