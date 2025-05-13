// Toggle choice button

document.addEventListener("DOMContentLoaded", function() {
  const toggleOptions = document.querySelectorAll(".toggle-option");
  const toggleBtn = document.querySelector(".toggle-btn");

  // Создаем и добавляем подсветку
  const toggleHighlight = document.createElement("div");
  toggleHighlight.classList.add("toggle-highlight");
  toggleBtn.appendChild(toggleHighlight);

  // Функция обновления позиции подсветки
  function updateHighlight(activeBtn) {
    const btnRect = activeBtn.getBoundingClientRect();
    const parentRect = toggleBtn.getBoundingClientRect();
    toggleHighlight.style.width = `${btnRect.width}px`;
    toggleHighlight.style.transform = `translateX(${btnRect.left - parentRect.left}px)`;
  }

  // Функция для обновления отображаемого контента
  function updateContent(activeBtn) {
    const componentListContent = document.getElementById("component-list-content");
    const selectedContent = document.getElementById("selected-content");

    if (activeBtn.dataset.value === "list") {
      componentListContent.classList.add("active");
      selectedContent.classList.remove("active");
    } else if (activeBtn.dataset.value === "selected") {
      selectedContent.classList.add("active");
      componentListContent.classList.remove("active");
    }
  }

  toggleOptions.forEach((btn) => {
    if (btn.classList.contains("active")) {
      updateHighlight(btn);
      updateContent(btn);
    }

    btn.addEventListener("click", () => {
      toggleOptions.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateHighlight(btn);
      updateContent(btn);
    });
  });
});

// Modals for pc parts
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-catalog");
  const modalTitle = document.getElementById("modal-title");
  const filtersContainer = document.getElementById("filter-container");
  const searchInput = document.querySelector('.modal-header .filter .filter-search input[type="text"]');
  const toggleSale = document.getElementById("toggle");
  const sortDropdown = document.querySelector(".categories-dropdown");
  const productContainerList = document.getElementById("list-view");
  const productContainerGrid = document.getElementById("grid-view");
  const closeBtn = document.querySelector(".close-modal-btn");
  const addPartButtons = document.querySelectorAll("[data-modal], .select-button[data-modal]");
  const categoryButtons = document.querySelectorAll(".categories button");

  let currentType = "";
  window.currentView = window.currentView || "list";
  let currentCategory = "";

  const filterMap = {
    cooler: { title: "Кулер", items: [{ type: 'slider', title: 'Цена', values: { step: 0.01, min: 239.57, max: 20000, currentMin: 239.57, currentMax: 16325.36 } }] },
    cpu: { title: "Процессор", items: [{ type: 'slider', title: 'Цена', values: { step: 0.01, min: 0, max: 5656 } }] },
    videocard: { title: "Видеокарта" },
    motherboard: { title: "Материнская плата" },
    powerunit: { title: "Блок питания" },
    ram: { title: "Оперативная память" },
    ssd: { title: "SSD" },
    hdd: { title: "Жёсткий диск" },
    case: { title: "Корпус" }
  };

  function getCheckboxContent(data) {
    let options = data.values.map(
        (item) => `<label><input type="checkbox"> ${item.name} <span>(${item.qnt})</span></label>`
    );
    return `
        <div class="filter-section dropdown">
          <div class="filter-title dropdown-header">
            <h3>${data.title}</h3>
            <img class="arrow" src="./assets/images/icons/arrow-down.svg" />
          </div>
          <div class="dropdown-content">
            <div class="options">
              ${options.join("\n")}
            </div>
          </div>
        </div>`;
  }

  function getSliderContent(data) {
    return `
        <div class="filter-section price dropdown">
          <div class="filter-title dropdown-header">
            <h3>${data.title}</h3>
            <img class="arrow" src="./assets/images/icons/arrow-down.svg" />
          </div>
          <div class="dropdown-content">
            <div class="filter-price-input">
              <input type="number" class="input-min" step="${data.values.step}" value="${data.values.currentMin || data.values.min}">
              <input type="number" class="input-max" step="${data.values.step}" value="${data.values.currentMax || data.values.max}">
            </div>
            <div class="price-slider">
              <div class="progress"></div>
            </div>
            <div class="range-input">
              <input type="range" class="range-min" min="${data.values.min}" max="${data.values.max}" value="${data.values.currentMin || data.values.min}" step="${data.values.step}">
              <input type="range" class="range-max" min="${data.values.min}" max="${data.values.max}" value="${data.values.currentMax || data.values.max}" step="${data.values.step}">
            </div>
          </div>
        </div>`;
  }

  function getSearchCheckboxContent(data) {
    let options = data.values.map(
        (item) => `<label><input type="checkbox"> ${item.name} <span>(${item.qnt})</span></label>`
    );
    return `
        <div class="filter-section dropdown">
          <div class="filter-title dropdown-header">
            <h3>${data.title}</h3>
            <img class="arrow" src="./assets/images/icons/arrow-down.svg" />
          </div>
          <div class="dropdown-content">
            <div class="filter-search inner-search">
              <input type="text" class="search" placeholder="Поиск" />
              <img src="./assets/images/icons/search.svg" class="search-icon" />
            </div>
            <div class="options">
              ${options.join("\n")}
            </div>
          </div>
        </div>`;
  }

  addPartButtons.forEach((button) => {
    setOpenModalEventOnButton(button);
  });
  function setOpenModalEventOnButton(button) {
    button.addEventListener("click", () => {
      currentType = button.dataset.modal;
      const category_name = CATEGORIES[currentType];
      const data = filterMap[category_name] || { title: currentType.toUpperCase() };
      modalTitle.textContent = data.title;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      let html = [];
      if (data.items) {
        data.items.forEach((filter) => {
          switch (filter.type) {
            case "slider":
              html.push(getSliderContent(filter));
              break;
            case "checkbox":
              html.push(getCheckboxContent(filter));
              break;
            case "SearchCheckbox":
              html.push(getSearchCheckboxContent(filter));
              break;
          }
        });
      }
      filtersContainer.innerHTML = `
          ${html.join("\n")}
          <div class="filter-buttons">
            <button class="clear-btn">Очистить</button>
            <button class="show-btn">Показать <span>0</span></button>
          </div>
        `;
      logCurrentFilters();
    });
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    clearAllFilters();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
      clearAllFilters();
    }
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentCategory = button.textContent;
      logCurrentFilters();
    });
  });

  [productContainerList, productContainerGrid].forEach((container) => {
    container.addEventListener("click", (event) => {
      if (event.target.closest(".buy-btn")) {
        const encodedData = event.target.getAttribute("data-product");
        const product = JSON.parse(decodeURIComponent(encodedData));
        console.log(product)
        addProductToComponent(product);
      }
    });
  });

  const CATEGORIES = {
    8: 'cpu',
    18: 'cooler',
    15: 'videocard',
    9: 'motherboard' ,
    54: 'powerunit',
    17: 'ram',
    235: 'ssd',
    90: 'hdd',
    53: 'case',
  };


    function addProductToComponent(product) {
    console.log(product);
    const productId = product.code;
    const currentType = product.categoty_id;
    console.log("Adding product with ID:", productId);

    const component_id = 'b_' + currentType;
    const component_name = CATEGORIES[currentType];

    const component = document.getElementById(component_id);
    if (!component) {
      console.error("Компонент не найден для типа:", currentType);
      return;
    }

    const originalWidth = component.clientWidth;
    let cardContainer = component.querySelector(".component-cards-container");

    // Если контейнер ещё не создан — создаём его один раз
    if (!cardContainer) {
      createCardContainerStructure(component, originalWidth, component_name, component_id);
      cardContainer = component.querySelector(".component-cards-container");
    }

    const card = createProductCard(product, component, component_name);
    cardContainer.appendChild(card);

    updateScrollButtons(component);

    modal.style.display = "none";
    document.body.style.overflow = "";
  }


  function createCardContainerStructure(component, originalWidth, component_name, component_id) {
    component.innerHTML = `
    <div class="component-list-container">
      <div class="component-list"></div>
    </div>
  `;
    component.classList.add("component-expanded");
    component.style.width = `${originalWidth}px`;

    const listContainer = component.querySelector(".component-list");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("component-cards-container");
    listContainer.appendChild(cardContainer);

    const scrollBtnContainer = createScrollButtons(component);
    component.appendChild(scrollBtnContainer);

    const actionBtnContainer = createActionButtons(component, component_name, component_id);
    component.appendChild(actionBtnContainer);

    component.querySelector('.component-list-container').style.display = "block";
  }

  function createScrollButtons(component) {
    const container = document.createElement("div");
    container.classList.add("scroll-btn-container");

    const leftBtn = document.createElement("button");
    leftBtn.classList.add("scroll-btn", "scroll-left", "disabled");
    leftBtn.innerHTML = `<img src="./assets/images/icons/arrow-left.svg" alt="left">`;
    leftBtn.dataset.bound = false;

    const rightBtn = document.createElement("button");
    rightBtn.classList.add("scroll-btn", "scroll-right", "disabled");
    rightBtn.innerHTML = `<img src="./assets/images/icons/arrow-right.svg" alt="right">`;
    rightBtn.dataset.bound = false;

    container.appendChild(leftBtn);
    container.appendChild(rightBtn);

    return container;
  }

  function createActionButtons(component, component_name, component_id) {
    const container = document.createElement("div");
    container.classList.add("action-btn-container");

    const addButton = document.createElement("button");
    addButton.classList.add("action-btn", "add-btn");
    addButton.innerHTML = `
    <img src="./assets/images/icons/add.svg" alt="add">
    <span class="btn-label">добавить</span>
  `;
    addButton.setAttribute("data-modal", component_id);
    setOpenModalEventOnButton(addButton);
    container.appendChild(addButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("action-btn", "remove-btn");
    removeButton.innerHTML = `
    <img src="./assets/images/icons/delete.svg" alt="remove">
    <span class="btn-label">удалить</span>
  `;

    removeButton.addEventListener("click", () => {
      const cardContainer = component.querySelector(".component-cards-container");
      cardContainer.innerHTML = "";
      restoreOriginalComponent(component, component_name);
    });

    container.appendChild(removeButton);

    return container;
  }

  function createProductCard(product, component, component_name) {
    const card = document.createElement("div");
    card.classList.add("component-list-card");
    card.dataset.id = product.code;

    card.innerHTML = `
    <div class="component-list-img">
      <img src="${product.image || './assets/images/card-3.png'}" alt="${product.title || 'Товар'}">
    </div>
    <div class="component-list-info">
      <div>
        <span>${filterMap[component_name]?.title || component_name.toUpperCase()}</span>
        <img src="./assets/images/icons/config_page/warning_img.svg" alt="obligatory" />
      </div>
      <div>${product.title || 'Без названия'}</div>
      <div class="component-list-price">${product.price || 'N/A'} <span>руб</span></div>
    </div>
    <div class="component-list-btns">
      <button class="component-list-btn-change">
        <img src="./assets/images/icons/change.svg">
        <span>заменить</span>
      </button>
      <button class="component-list-btn-delete">
        <img src="./assets/images/icons/delete.svg">
        <span>удалить</span>
      </button>
    </div>
  `;


    card.querySelector(".component-list-btn-change").addEventListener("click", () => {
      const selectButton = document.querySelector(`.select-button[data-modal="${component.dataset.type}"]`);
      if (selectButton) selectButton.click();
    });

    card.querySelector(".component-list-btn-delete").addEventListener("click", () => {
      card.remove();
      updateScrollButtons(component);
      const cardContainer = component.querySelector(".component-cards-container");
      if (!cardContainer || cardContainer.querySelectorAll(".component-list-card").length === 0) {
        restoreOriginalComponent(component, component_name);
      }
    });

    return card;
  }

  function updateScrollButtons(component) {
    const cardContainer = component.querySelector(".component-cards-container");
    const scrollBtnContainer = component.querySelector(".scroll-btn-container");
    const scrollLeftBtn = component.querySelector(".scroll-left");
    const scrollRightBtn = component.querySelector(".scroll-right");

    if (!cardContainer || !scrollBtnContainer || !scrollLeftBtn || !scrollRightBtn) return;

    const cardCount = cardContainer.querySelectorAll(".component-list-card").length;

    // Скрываем кнопки, если недостаточно карточек
    if (cardCount < 2) {
      scrollBtnContainer.style.display = "none";
      return;
    }

    scrollBtnContainer.style.display = "flex";

    const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;

    function updateButtonState() {
      scrollLeftBtn.classList.toggle("disabled", cardContainer.scrollLeft <= 0);
      scrollRightBtn.classList.toggle("disabled", cardContainer.scrollLeft >= maxScrollLeft - 1);
    }

    if (!cardContainer._scrollHandlerBound) {
      cardContainer.addEventListener("scroll", updateButtonState);
      cardContainer._scrollHandlerBound = true;
    }

    if (!scrollLeftBtn._clickHandlerBound) {
      scrollLeftBtn.addEventListener("click", () => {
        if (!scrollLeftBtn.classList.contains("disabled")) {
          cardContainer.scrollBy({ left: -280, behavior: 'smooth' });
        }
      });
      scrollLeftBtn._clickHandlerBound = true;
    }

    if (!scrollRightBtn._clickHandlerBound) {
      scrollRightBtn.addEventListener("click", () => {
        if (!scrollRightBtn.classList.contains("disabled")) {
          cardContainer.scrollBy({ left: 280, behavior: 'smooth' });
        }
      });
      scrollRightBtn._clickHandlerBound = true;
    }

    requestAnimationFrame(updateButtonState);
  }


  function restoreOriginalComponent(component, type) {
    console.log(type);
    component.innerHTML = `
            <div class="component-part component-img">
                <img src="./assets/images/icons/config_page/${type}_img.svg" alt="${type}-img" />
            </div>
            <div class="component-part component-info">
                <span class="component-name">${filterMap[type]?.title || type.toUpperCase()}</span>
                <img src="./assets/images/icons/config_page/warning_img.svg" alt="obligatory" />
            </div>
            <div class="component-part component-product-count">353 товара</div>
            <button class="component-part primary-btn select-button" data-modal="${type}">
                Выбрать
                <img src="./assets/images/buttons/plus-review.svg" alt="">
            </button>
        `;
    component.classList.remove("component-expanded");
    component.style.width = "";

    const selectButton = component.querySelector(".select-button");
    if (selectButton) {
      selectButton.addEventListener("click", () => {
        currentType = selectButton.dataset.modal;
        const data = filterMap[currentType] || { title: currentType.toUpperCase() };
        modalTitle.textContent = data.title;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        let html = [];
        if (data.items) {
          data.items.forEach((filter) => {
            if (filter.type === "slider") {
              html.push(getSliderContent(filter));
            }
          });
        }
        filtersContainer.innerHTML = `
                    ${html.join("\n")}
                    <div class="filter-buttons">
                        <button class="clear-btn">Очистить</button>
                        <button class="show-btn">Показать <span>0</span></button>
                    </div>
                `;

        logCurrentFilters();
      });
    }
  }


  function logCurrentFilters() {
    const filters = getSelectedFilters();
    const search = searchInput?.value.trim() || "";
    const saleOnly = toggleSale?.checked || false;
    const sort = sortDropdown?.value || "";
    const category = currentCategory || "";

    const payload = { search, filters, saleOnly, sort, category };

    clearModal('Идут загрузка данных...');
    //console.clear();
    console.log("Отправляемые данные на бэк:", payload);
    sendFilters(payload, currentType);
  }

  function sendFilters(payload, type) {
    if (!type) {
      console.error("Type of product is not defined");
      return;
    }
    const queryParams = new URLSearchParams({
      name: payload.search || "",
      saleOnly: payload.saleOnly || false,
      sort: payload.sort || "",
      category: payload.category || "",
      ...Object.entries(payload.filters).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.join(",") : JSON.stringify(value);
        return acc;
      }, {}),
    });

    const url = `/config/products/${type}?${queryParams.toString()}`;

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка при загрузке продуктов для ${type}: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Данные от API:", data);
          if (!data || !Array.isArray(data.products)) {
            console.error("Invalid products dta:", data);
            renderProducts([], type);
            return;
          }
          const adaptedProducts = data.products.map(product => ({
            code: product.sku,
            title: product.name,
            price: product.price,
            image: product.image || './assets/images/placeholder.png',
            installment: product.installment || 'N/A',
            tags: product.tags || [],
            oldPrice: product.oldPrice || null
          }));
          renderProducts(adaptedProducts, type);
        })
        .catch((error) => {
          console.error("Ошибка при запросе к API:", error);
          renderProducts([], type);
        });
  }

  function clearModal(text = '') {
    const productContainer = currentView === "list" ? productContainerList : productContainerGrid;
    const otherContainer = currentView === "list" ? productContainerGrid : productContainerList;

    productContainer.innerHTML = text;
    otherContainer.innerHTML = "";
  }

  function renderProducts(products, category_id) {
    const productContainerList = document.getElementById("list-view");
    const productContainerGrid = document.getElementById("grid-view");
    const productContainer = currentView === "list" ? productContainerList : productContainerGrid;

    clearModal();

    if (!Array.isArray(products)) {
      console.error("Invalid required data type:", products);
      productContainer.innerHTML = `<div class="products-container-no-match">Ошибка: некорректные данные продуктов</div>`;
      return;
    }

    if (products.length === 0) {
      productContainer.innerHTML = `<div class="products-container-no-match">Ничего не найдено</div>`;
      return;
    }

    products.forEach((product) => {
      product.categoty_id = category_id.replace(/\D/g, "");
      const json_product_data = encodeURIComponent(JSON.stringify(product));
      const card = document.createElement("div");
      card.className = `product-card ${currentView}-style`;
      card.innerHTML = currentView === "grid" ? `
                <div class="product-card-img grid-style">
                    <div class="card-img-main-product grid-style">
                        <img src="${product.image || './assets/images/placeholder.png'}" alt="${product.title || 'Без названия'}">
                    </div>
                </div>
                <div class="info">
                    <div class="product-title-rate">
                        <h3 class="product-title grid-style">${product.title || 'Без названия'}</h3>
                    </div>
                    <div class="info-details">
                        <div class="product-code grid-style">Код товара: ${product.code || 'N/A'}</div>
                        <div class="details">
                            <a href="#">
                                <span class="full-text">Смотреть подробнее</span>
                                <span class="short-text">Подробнее</span>
                                <img src="./assets/images/icons/view-detaitls.svg">
                            </a>
                        </div>
                    </div>
                    <div class="product-characterictic-tags">
                        ${product.tags?.map((tag) => `<span>${tag}</span>`).join("") || ""}
                    </div>
                    <div class="product-price">
                        <div class="cont-price grid-style">
                            <p class="new-price grid-style">${product.price || 'N/A'}</p>
                            ${product.oldPrice ? `<p class="old-price grid-style">${product.oldPrice}</p>` : ""}
                        </div>
                        <div class="payment-option green grid-style desktop-only">от <span>${product.installment || 'N/A'}</span> руб/мес</div>
                    </div>
                    <div class="button-cont">
                        <button class="buy-btn" data-product="${json_product_data}">Добавить</button>
                    </div>
                </div>
            ` : `
                <div class="product-card-img list-style">
                    <div class="card-img-main-product list-style">
                        <img src="${product.image || './assets/images/placeholder.png'}" alt="${product.title || 'Без названия'}">
                    </div>
                </div>
                <div class="info">
                    <h3 class="product-title list-style">${product.title || 'Без названия'}</h3>
                    <div class="more-data">
                        <div class="product-code list-style">Код товара: ${product.code || 'N/A'}</div>
                        <div class="details" id="details-btn">
                            <a href="#">
                                <span class="full-text">Смотреть подробнее</span>
                                <span class="short-text">Подробнее</span>
                                <img src="./assets/images/icons/view-detaitls.svg">
                            </a>
                        </div>
                    </div>
                    <div class="product-characterictic-tags">
                        ${product.tags?.map((tag) => `<span>${tag}</span>`).join("") || ""}
                    </div>
                </div>
                <div class="cashflow-options list-style">
                    <div class="buy-options">
                        <div class="cont-price list-style">
                            <p class="new-price">${product.price || 'N/A'}</p>
                            ${product.oldPrice ? `<p class="old-price list-style">${product.oldPrice}</p>` : ""}
                        </div>
                        <div class="payment-options">
                            <div class="payment-option green">от <span>${product.installment || 'N/A'}</span> руб/мес</div>
                            <div class="payment-desc">картой рассрочки <br> или в кредит</div>
                        </div>
                    </div>
                    <div class="buttons-for-deal">
                        <button class="buy-btn" data-product="${json_product_data}">Добавить</button>
                    </div>
                </div>
            `;
      productContainer.appendChild(card);
    });
  }

  function clearAllFilters() {
    const allCheckboxes = filtersContainer?.querySelectorAll('input[type="checkbox"]');
    allCheckboxes?.forEach((cb) => (cb.checked = false));
    const sliders = filtersContainer?.querySelectorAll(".filter-section.price");
    sliders?.forEach((slider) => {
      const minInput = slider.querySelector(".input-min");
      const maxInput = slider.querySelector(".input-max");
      const rangeMin = slider.querySelector(".range-min");
      const rangeMax = slider.querySelector(".range-max");
      const min = parseFloat(rangeMin?.getAttribute("min")) || 0;
      const max = parseFloat(rangeMax?.getAttribute("max")) || 100;
      if (minInput) minInput.value = min;
      if (maxInput) maxInput.value = max;
      if (rangeMin) rangeMin.value = min;
      if (rangeMax) rangeMax.value = max;
    });
    if (searchInput) searchInput.value = "";
    if (toggleSale) toggleSale.checked = false;
    if (sortDropdown && sortDropdown.options.length > 0) {
      sortDropdown.selectedIndex = 0;
    }
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    currentCategory = "";
  }

  function getSelectedFilters() {
    const filters = {};
    if (!filtersContainer) return filters;
    const allCheckboxes = filtersContainer.querySelectorAll('input[type="checkbox"]:checked');
    allCheckboxes.forEach((checkbox) => {
      const group = checkbox.closest(".filter-section");
      const title = group?.querySelector("h3")?.textContent.trim();
      const labelText = checkbox.parentNode?.textContent || checkbox.value;
      const value = labelText.trim().split("(")[0].trim();
      if (title && value) {
        if (!filters[title]) filters[title] = [];
        filters[title].push(value);
      }
    });
    const sliders = filtersContainer.querySelectorAll(".filter-section.price");
    sliders.forEach((slider) => {
      const title = slider.querySelector("h3")?.textContent.trim();
      const minInput = slider.querySelector(".input-min");
      const maxInput = slider.querySelector(".input-max");
      if (title && minInput && maxInput) {
        const min = parseFloat(minInput.value);
        const max = parseFloat(maxInput.value);
        if (!isNaN(min) && !isNaN(max)) {
          filters[title] = { min, max };
        }
      }
    });
    return filters;
  }
});

// popup product info

document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modal-about-item');
  const detailsBtn = document.getElementById('details-btn');
  const closeModalBtn = modalOverlay.querySelector('.close-modal-btn');
  const body = document.getElementsByTagName('body');

  function openModal(e) {
    if (e) e.preventDefault();
    modalOverlay.style.display = 'flex';
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);
    body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
      body.style.overflow = '';
    }, 300);
  }

  detailsBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
      closeModal();
    }
  });
});

//

document.addEventListener('DOMContentLoaded', function(element) {
  if(element.src) {
    document.getElementById('mainImg').src = element.src;
    document.querySelectorAll('.modal-preview-img-wrapper').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
  }
})

//
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('back-to-catalog-block').addEventListener('click', function() {
    document.getElementById('modal-cooler-catalog').style.display = 'block';
    document.getElementById('modal-about-item').style.display = "none";
  });
})


// modal item btns

document.addEventListener('DOMContentLoaded', function() {

  const buyButton = document.getElementById('buy-item');
  const changeChoiceContainer = document.getElementById('change-choice');
  const deleteButton = document.querySelector('.btn-delete-modal-item');


  if (buyButton) {
    buyButton.addEventListener('click', function() {
      this.style.display = 'none';

      if (changeChoiceContainer) {
        changeChoiceContainer.style.display = 'flex';
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', function() {
      if (buyButton) {
        buyButton.style.display = 'block';
      }

      if (changeChoiceContainer) {
        changeChoiceContainer.style.display = 'none';
      }
    });
  }

  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const qtyInput = document.querySelector('.qty-input');

  if (minusBtn && qtyInput) {
    minusBtn.addEventListener('click', function() {
      let value = parseInt(qtyInput.value);
      if (value > 1) {
        qtyInput.value = value - 1;
      }
    });
  }

  if (plusBtn && qtyInput) {
    plusBtn.addEventListener('click', function() {
      let value = parseInt(qtyInput.value);
      qtyInput.value = value + 1;
    });
  }
});

// Modal scroll sticky header

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-about-item");
  const modalFrame = modal.querySelector(".modal-frame");
  const modalTitle = modal.querySelector(".modal-item-title");
  const modalPrice = modal.querySelector(".modal-content-price");
  const buyButton = modal.querySelector("#buy-item");

  const stickyHeaderWrapper = document.createElement("div");
  const stickyHeader = document.createElement("div");
  stickyHeader.className = "sticky-header";

  const clonedTitle = modalTitle.cloneNode(true);
  const clonedPrice = modalPrice.cloneNode(true);
  const clonedButton = buyButton.cloneNode(true);

  stickyHeader.appendChild(clonedTitle);
  stickyHeader.appendChild(clonedPrice);
  stickyHeader.appendChild(clonedButton);

  stickyHeaderWrapper.style.position = "absolute";
  stickyHeaderWrapper.style.left = 0;
  stickyHeaderWrapper.style.top = 0;
  stickyHeaderWrapper.appendChild(stickyHeader);

  modalFrame.appendChild(stickyHeaderWrapper);

  function updateStickyHeader() {
    const buttonRect = buyButton.getBoundingClientRect();
    const modalRect = modalFrame.getBoundingClientRect();

    const buttonTop = buttonRect.top - modalRect.top;
    const buttonBottom = buttonRect.bottom - modalRect.top;

    const isButtonVisible = buttonTop >= 0 && buttonBottom <= modalFrame.clientHeight;

    if (!isButtonVisible) {
      stickyHeader.classList.add("visible");
    } else {
      stickyHeader.classList.remove("visible");
    }
  }

  modalFrame.addEventListener("scroll", updateStickyHeader);
  updateStickyHeader();

  clonedButton.addEventListener("click", function () {
    buyButton.click();
  });
});


//
document.addEventListener("DOMContentLoaded", function() {
  const chooseBtn = document.getElementById('choose-more');
  const modalShop = document.getElementById('modal-cooler-catalog');
  if (modalShop) {
    const closeModalBtn = modalShop.querySelector('.close-modal-btn');
    closeModalBtn.addEventListener('click', closeModal);
  }
  const changeBtn = document.getElementById('change-btn')
  const body = document.getElementsByTagName('body')


  function openModal(e) {
    if (e) e.preventDefault();
    if (modalShop) {
      modalShop.style.display = 'flex';
      setTimeout(() => {
        modalShop.classList.add('active');
      }, 10);
    }
    if (body && body.style) {
      body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalShop) {
      modalShop.classList.remove('active');
      setTimeout(() => {
        modalShop.style.display = 'none';
        body.style.overflow = '';

      }, 300);
    }
  }

  chooseBtn.addEventListener('click', openModal);
  changeBtn.addEventListener('click', openModal);

  if (modalShop) {
    modalShop.addEventListener('click', function(e) {
      if (e.target === modalShop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalShop.style.display === 'flex') {
      closeModal();
    }
  });
});
