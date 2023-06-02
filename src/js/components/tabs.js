const selectors = {
  root: '[data-js-tabs]',
  button: '[data-js-tabs-button]',
  group: '[data-js-tabs-group]',
}

const stateClasses = {
  isActive: 'is-active',
}

const initTabs = (rootElement) => {
  const buttonElements = rootElement.querySelectorAll(selectors.button)
  const groupElements = rootElement.querySelectorAll(selectors.group)

  const onButtonClick = (event) => {
    const { target } = event
    const id = target.getAttribute('data-js-tabs-button')

    buttonElements.forEach((buttonElement) => {
      buttonElement.classList.toggle(stateClasses.isActive, buttonElement === target)
    })

    groupElements.forEach((groupElement) => {
      groupElement.classList.toggle(stateClasses.isActive, groupElement.id === id)
    })
  }

  buttonElements.forEach((buttonElement) => {
    buttonElement.addEventListener('click', onButtonClick)
  })
}

document.querySelectorAll(selectors.root).forEach(initTabs)
