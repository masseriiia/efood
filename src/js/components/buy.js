const selectors = {
  root: '[data-js-buy]',
  openButton: '[data-js-buy-toggle-button]',
  tooltip: '[data-js-buy-tooltip]',
  closeButton: '[data-js-buy-close-button]',
  foodCard: '[data-js-food-card]',
  addButton: '[data-js-cart-preview-add-button]',
  decreaseButton: '[data-js-cart-preview-decrease-button]',
  increaseButton: '[data-js-cart-preview-increase-button]',
  deleteButton: '[data-js-cart-preview-delete-button]',
};

const stateClasses = {
  isActive: 'is-active',
}

const initBuy = () => {
  const openButtonElement = document.querySelector(selectors.openButton)
  const tooltipElement = document.querySelector(selectors.tooltip);
  const closeButtonElement = document.querySelector(selectors.closeButton)
  const addButtonElement = document.querySelectorAll(selectors.addButton)

  const localStorageKey = 'cart'
  let currentCartState = {}
  try {
    currentCartState = JSON.parse(localStorage.getItem(localStorageKey)) || {}
  } catch (error) {}

  openButtonElement.addEventListener('click', () => {
    tooltipElement.classList.add(stateClasses.isActive);
  })

  closeButtonElement.addEventListener('click', () => {
    tooltipElement.classList.remove(stateClasses.isActive);
  })

  const renderPreview = () => {
    console.debug('currentCartState:', currentCartState);
    const itemsMarkup = Object.entries(currentCartState)
      .map(([id, { title, price, amount }]) => {
        const totalPrice = price * amount;
        const totalPriceFormatted = totalPrice.toFixed(2);

        return `
          <li data-product-id="${id}">
            <div>${title}</div>
            <div>${price} x ${amount}</div>
            <div>$${totalPriceFormatted}</div>
            <button class="btn-reset btn" data-js-cart-preview-decrease-button>-</button>
            <button class="btn-reset btn" data-js-cart-preview-increase-button>+</button>
            <button class="btn-reset btn" data-js-cart-preview-delete-button>X</button>
          </li>
        `;
      })
      .join('');

    const totalPrice = Object.values(currentCartState)
      .reduce((acc, { price, amount }) => acc + price * amount, 0)
      .toFixed(2);

    const markup = `
      <div>
        <h4 class="buy-title">Корзина</h4>
        <ul class="list-reset buy-list">${itemsMarkup}</ul>
        <div class="buy-result">Total Price: $${totalPrice}</div>
        <button class="btn-reset btn" data-js-buy-close-button>Close</button>
      </div>
    `
    tooltipElement.innerHTML = markup;

    const decreaseButtons = tooltipElement.querySelectorAll(selectors.decreaseButton);
    const increaseButtons = tooltipElement.querySelectorAll(selectors.increaseButton);
    const deleteButtons = tooltipElement.querySelectorAll(selectors.deleteButton);

    decreaseButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.closest('[data-product-id]').dataset.productId;
        decreaseAmount(productId);
      });
    });

    increaseButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.closest('[data-product-id]').dataset.productId;
        increaseAmount(productId);
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.closest('[data-product-id]').dataset.productId;
        deleteProduct(productId);
      });
    });

    const closeButton = tooltipElement.querySelector(selectors.closeButton);
    closeButton.addEventListener('click', () => {
      tooltipElement.classList.remove(stateClasses.isActive);
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(currentCartState));
  };

  const addToCart = (productInfo) => {
    const { id, title, price } = productInfo;
    const isAlreadyAdded = currentCartState.hasOwnProperty(id);
    if (isAlreadyAdded) {
      currentCartState[id].amount += 1;
    } else {
      currentCartState = {
        ...currentCartState,
        [id]: { title, price, amount: 1 },
      };
    }
    saveToLocalStorage();
    renderPreview();
  }

  const onAddButtonClick = (addButtonElement) => {
    const data = addButtonElement.getAttribute('data-js-cart-preview-add-button');
    const parsedData = JSON.parse(data);

    addToCart(parsedData);
  }

  addButtonElement.forEach((button) => {
    button.addEventListener('click', () => {
      onAddButtonClick(button);
    })
  })

  const decreaseAmount = (productId) => {
    if (currentCartState.hasOwnProperty(productId)) {
      currentCartState[productId].amount -= 1;
      saveToLocalStorage();
      renderPreview();
    }
  }

  const increaseAmount = (productId) => {
    if (currentCartState.hasOwnProperty(productId)) {
      currentCartState[productId].amount += 1;
      saveToLocalStorage();
      renderPreview();
    }
  }

  const deleteProduct = (productId) => {
    if (currentCartState.hasOwnProperty(productId)) {
      delete currentCartState[productId];
      saveToLocalStorage();
      renderPreview();
    }
  }

  renderPreview();
}

initBuy();
