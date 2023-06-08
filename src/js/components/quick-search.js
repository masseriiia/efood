const selectors = {
  root: '[data-js-quick-search]',
  toggleButton: '[data-js-quick-search-toggle-button]',
  tooltip: '[data-js-quick-search-tooltip]',
  closeButton: '[data-js-quick-search-close-button]',
  form: '[data-js-quick-search-form]',
  input: '[data-js-quick-search-input]',
  resultList: '[data-js-quick-search-result-list]',
}

const stateClasses = {
  isActive: 'is-active',
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

const initQuickSearch = () => {
  const rootElement = document.querySelector(selectors.root)
  if (!rootElement) return

  const toggleButtonElement = rootElement.querySelector(selectors.toggleButton)
  const tooltipElement = rootElement.querySelector(selectors.tooltip)
  const closeButtonElement = rootElement.querySelector(selectors.closeButton)
  const formElement = rootElement.querySelector(selectors.form)
  const inputElement = rootElement.querySelector(selectors.input)
  const resultListElement = rootElement.querySelector(selectors.resultList)

  const clearValue = () => {
    inputElement.value = ''
  }

  const clearResult = () => {
    resultListElement.innerHTML = ''
  }

  const open = () => {
    tooltipElement.classList.add(stateClasses.isActive)
    clearValue()
    clearResult()
  }

  const close = () => {
    tooltipElement.classList.remove(stateClasses.isActive)
  }

  const wrapString = (string, query) => {
    return string.replaceAll(query, `<mark>${query}</mark>`)
  }

  const render = (items = []) => {
    resultListElement.innerHTML = items
      .map(({ title }) => {
        return `<li><a href="/">${title}</a></li>`
      })
      .join('')
  }

  const fetchResult = (query) => {
    const url = `${BASE_URL}?_limit=10&query=${query}`

    fetch(url)
      .then((response) => response.json())
      .then((response) => render(response, query))
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const onInput = async (event) => {
    const clearValue = event.target.value.trim()

    fetchResult(clearValue)
  }

  toggleButtonElement.addEventListener('click', open)
  closeButtonElement.addEventListener('click', close)
  formElement.addEventListener('submit', onSubmit)
  inputElement.addEventListener('input', onInput)
}

initQuickSearch()
