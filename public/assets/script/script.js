// document.addEventListener('DOMContentLoaded', function () {
//   function initializeSlider(sliderSelector, itemSelector, nextBtnSelector, prevBtnSelector) {
//       const slider = document.querySelector(sliderSelector);
//       const nextBtn = document.querySelector(nextBtnSelector);
//       const prevBtn = document.querySelector(prevBtnSelector);
//       const items = document.querySelectorAll(`${sliderSelector} ${itemSelector}`);

//       if (!slider || !items.length || !nextBtn || !prevBtn) {
//           //console.warn(`Slider initialization skipped for: ${sliderSelector}`);
//           return;
//       }

//       let currentIndex = 0;
//       let itemWidth = items[0].offsetWidth;
//       const intervalTime = 5000;
//       let autoSlideInterval;

//       function calculateVisibleItemsCount() {
//           const parentWidth = slider.offsetWidth;
//           return Math.floor(parentWidth / (itemWidth + getGapSize()));
//       }

//       function getGapSize() {
//           const style = window.getComputedStyle(slider);
//           return parseFloat(style.gap) || 0;
//       }

//       function updateButtonsState() {
//           const visibleItemsCount = calculateVisibleItemsCount();
//           const maxIndex = items.length - visibleItemsCount;

//           prevBtn.classList.toggle('hidden', currentIndex === 0);
//           prevBtn.classList.toggle('active', currentIndex > 0);

//           nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
//       }

//       function slideToNext() {
//           const visibleItemsCount = calculateVisibleItemsCount();
//           const maxIndex = items.length - visibleItemsCount - 1;

//           if (currentIndex < maxIndex) {
//               currentIndex++;
//               updateSliderPosition();
//           }
//       }

//       function slideToPrev() {
//           if (currentIndex > 0) {
//               currentIndex--;
//               updateSliderPosition();
//           }
//       }

//       function updateSliderPosition() {
//           const offset = currentIndex * (itemWidth + getGapSize());
//           slider.style.transform = `translateX(-${offset}px)`;
//           slider.style.transition = 'transform 0.5s ease';
//           updateButtonsState();
//       }

//       function startAutoSlide() {
//           autoSlideInterval = setInterval(slideToNext, intervalTime);
//       }

//       function stopAutoSlide() {
//           clearInterval(autoSlideInterval);
//       }

//       nextBtn.addEventListener('click', function () {
//           if (!nextBtn.classList.contains('disabled')) {
//               stopAutoSlide();
//               slideToNext();
//               startAutoSlide();
//           }
//       });

//       prevBtn.addEventListener('click', function () {
//           if (!prevBtn.classList.contains('hidden')) {
//               stopAutoSlide();
//               slideToPrev();
//               startAutoSlide();
//           }
//       });

//       window.addEventListener('resize', function () {
//           slider.style.transition = 'none';
//           itemWidth = items[0].offsetWidth;
//           updateSliderPosition();
//       });

//       updateButtonsState();
//       // startAutoSlide();
//   }

//   initializeSlider('.review-list', '.review-item', '.review .slider-arrow.next-btn', '.review .slider-arrow.prev-btn');
//   initializeSlider('.popular-list', '.popular-card', '.popular-cards-config .slider-arrow.next-btn', '.popular-cards-config .slider-arrow.prev-btn');
// });



document.addEventListener('DOMContentLoaded', function () {
  function initializeSlider(sliderSelector, itemSelector, nextBtnSelector, prevBtnSelector) {
      const slider = document.querySelector(sliderSelector);
      const nextBtn = document.querySelector(nextBtnSelector);
      const prevBtn = document.querySelector(prevBtnSelector);
      const items = document.querySelectorAll(`${sliderSelector} ${itemSelector}`);

      if (!slider || !items.length || !nextBtn || !prevBtn) {
          return;
      }

      let currentIndex = 0;
      let itemWidth = items[0].offsetWidth;
      const intervalTime = 5000;
      let autoSlideInterval;

      function calculateVisibleItemsCount() {
          const parentWidth = slider.offsetWidth;
          return Math.floor(parentWidth / (itemWidth + getGapSize()));
      }

      function getGapSize() {
          const style = window.getComputedStyle(slider);
          return parseFloat(style.gap) || 0;
      }

      function updateButtonsState() {
          const visibleItemsCount = calculateVisibleItemsCount();
          const maxIndex = items.length - visibleItemsCount;

          prevBtn.classList.toggle('active', currentIndex > 0);
          prevBtn.classList.toggle('hidden', currentIndex === 0); 

          nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
      }

      function slideToNext() {
          const visibleItemsCount = calculateVisibleItemsCount();
          const maxIndex = items.length - visibleItemsCount;

          if (currentIndex < maxIndex) {
              currentIndex++;
              updateSliderPosition();
          }
      }

      function slideToPrev() {
          if (currentIndex > 0) {
              currentIndex--;
              updateSliderPosition();
          }
      }

      function updateSliderPosition() {
          const offset = currentIndex * (itemWidth + getGapSize());
          slider.style.transform = `translateX(-${offset}px)`;
          slider.style.transition = 'transform 0.5s ease';
          updateButtonsState();
      }

      function startAutoSlide() {
          autoSlideInterval = setInterval(slideToNext, intervalTime);
      }

      function stopAutoSlide() {
          clearInterval(autoSlideInterval);
      }

      nextBtn.addEventListener('click', function () {
          if (!nextBtn.classList.contains('disabled')) {
              stopAutoSlide();
              slideToNext();
              startAutoSlide();
          }
      });

      prevBtn.addEventListener('click', function () {
          if (currentIndex > 0) { 
              stopAutoSlide();
              slideToPrev();
              startAutoSlide();
          }
      });

      window.addEventListener('resize', function () {
          slider.style.transition = 'none';
          itemWidth = items[0].offsetWidth;
          updateSliderPosition();
      });

      updateButtonsState();
      // startAutoSlide();
  }

  initializeSlider('.review-list', '.review-item', '.review .slider-arrow.next-btn', '.review .slider-arrow.prev-btn');
  initializeSlider('.popular-list', '.popular-card', '.popular-cards-config .slider-arrow.next-btn', '.popular-cards-config .slider-arrow.prev-btn');
});

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    function hideAllBanners() {
        document.querySelectorAll('.banners').forEach(banners => {
            banners.style.display = 'none';
        });
    }
    hideAllBanners();
    const bannerElement = document.getElementById('banner1');
    if (bannerElement) {
        bannerElement.style.display = 'flex';
    }
    const buttons = document.querySelectorAll('.item-tag');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const bannerNumber = button.className.match(/banner-(\d+)/)[1];
            const targetBannerId = `banner${bannerNumber}`;
            hideAllBanners();

            document.getElementById(targetBannerId).style.display = 'flex';
        });
    });
});

// Modals open-close

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector('.cont-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    document.querySelectorAll('.open-form').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector('.cont-modal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    document.querySelectorAll('.review-modal-open').forEach(button => {
        button.addEventListener('click', () => {
            const reviewModal = document.querySelector('.review-cont-modal');
            if (reviewModal) {
                reviewModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const reviewModal = document.querySelector('.review-cont-modal');
            if (reviewModal) {
                reviewModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    window.addEventListener('click', (event) => {
      const modal = document.querySelector('.cont-modal');
      const reviewModal = document.querySelector('.review-cont-modal');

      if (event.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
      }

      if (event.target === reviewModal) {
          reviewModal.style.display = 'none';
          document.body.style.overflow = '';
      }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.querySelector('.cont-modal');
        const reviewModal = document.querySelector('.review-cont-modal');

        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        if (reviewModal) {
            reviewModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

});

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const selectedValue = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= selectedValue);
            });
            ratingValue.textContent = selectedValue;
            document.querySelector('.star-rating').setAttribute('data-selected', selectedValue);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');
    let selectedCategory = '';
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const selectedValue = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= selectedValue);
            });
            ratingValue.textContent = selectedValue;
            document.querySelector('.star-rating').setAttribute('data-selected', selectedValue);
        });
    });
    document.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
        });
    });
    document.querySelector('.contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if (!selectedCategory) {
            return;
        }
        const selectedRating = document.querySelector('.star-rating').getAttribute('data-selected');
        if (!selectedRating || selectedRating === '0') {
            return;
        }
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email')?.value || '',
            category: selectedCategory,
            rating: selectedRating,
            message: document.getElementById('message')?.value || ''
        };
    });
});

// Form validation

document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".modal");

    modals.forEach((modal) => {
      const form = modal.querySelector("form");
      if (!form) return;

      const submitButton = form.querySelector(".submit-button");
      if (!submitButton) return;
      submitButton.disabled = true;

      const inputs = Array.from(form.querySelectorAll("input, textarea")).filter(
        ({ type }) => type !== "radio"
      );
      const requiredInputs = inputs.filter((input) => input.required);

      const categoryInputs = form.querySelectorAll('input[name="category"]');
      const categoryGroup = form.querySelector(".category-group");
      const thankScreen = form.querySelector(".thaks-screen");
      const errorScreen = form.querySelector(".error-screen");
      const closeModal = modal.querySelector(".close-modal");

      let dirtyFields = new Set();
      let validFields = new Set();

      function validateInput(input) {
        if (!dirtyFields.has(input.name)) return true;

        let isValid = true;
        const value = input.value.trim();
        const formGroup = input.closest(".form-group");

        if (!input.required && value === "") {
          dirtyFields.delete(input.name);
          formGroup.classList.remove("error");
          return;
        }

        if (input.required && value === "") {
          isValid = false;
        }

        if (
          input.type === "email" &&
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(value)
        ) {
          isValid = false;
        }

        if (
          input.name === "name" &&
          (value.length < 2 ||
            !/^[а-яa-z]{2,}(\s)?([а-яa-z\s]{2,})?$/gi.test(value))
        ) {
          isValid = false;
        }

        if (input.name === "message" && value.length < 10) {
          isValid = false;
        }

        if (isValid) {
          formGroup.classList.remove("error");
          validFields.add(input.name);
        } else {
          formGroup.classList.add("error");
          validFields.delete(input.name);
        }

        return isValid;
      }

      function validateCategory() {
        if (!categoryInputs.length) return true;

        if (!dirtyFields.has("category")) return;

        const isValid = [...categoryInputs].some((input) => input.checked);
        if (isValid) {
          categoryGroup.classList.remove("error");
          validFields.add("category");
        } else {
          categoryGroup.classList.add("error");
          validFields.delete("category");
        }

        return isValid;
      }

      function validateForm() {
        let isValid = true;

        requiredInputs.forEach((input) => {
          if (dirtyFields.has(input.name)) {
            isValid = validateInput(input) && isValid;
          }
        });

        inputs.forEach((input) => {
          if (!input.required && dirtyFields.has(input.name)) {
            isValid = validateInput(input) && isValid;
          }
        });

        isValid = validateCategory() && isValid;

        submitButton.disabled = !(
          requiredInputs.every(
            (input) => dirtyFields.has(input.name) && validFields.has(input.name)
          ) &&
          inputs.every(
            (input) =>
              input.required ||
              !dirtyFields.has(input.name) ||
              validFields.has(input.name)
          ) &&
          (categoryInputs.length
            ? [...categoryInputs].some((input) => input.checked)
            : true)
        );
      }

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          dirtyFields.add(input.name);
          validateForm();
        });

        input.addEventListener("blur", () => {
          dirtyFields.add(input.name);
          validateForm();
        });
      });

      categoryInputs.forEach((radio) => {
        radio.addEventListener("change", () => {
          dirtyFields.add("category");
          validateForm();
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (submitButton.disabled) return;
        setTimeout(() => {
          form.style.display = "none";
          thankScreen.style.display = "block";
        }, 500);
      });

      function resetForm() {
        form.reset();
        dirtyFields.clear();
        validFields.clear();
        inputs.forEach((input) => {
          const formGroup = input.closest(".form-group");
          formGroup.classList.remove("error");
        });
        categoryGroup.classList.remove("error");
        form.style.display = "block";
        thankScreen.style.display = "none";
        errorScreen.style.display = "none";
      }

      thankScreen.addEventListener("click", resetForm);
      errorScreen.addEventListener("click", resetForm);

      closeModal.addEventListener("click", () => {
        modal.closest(".review-cont-modal, .cont-modal").style.display = "none";
        resetForm();
      });
    });
  });

// Slider for Images
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');

    const visibleSlidesCount = 6;
    const totalSlidesCount = slideItems.length;
    const sliderHeight = 83;
    let index = 0;

    function updateActiveImg(newIndex) {
        slideItems.forEach((item, i) => {
            item.classList.toggle('active', i === newIndex);
        });
        if (slides) {
            slides.style.transform = `translateY(${-index * sliderHeight}px)`;
        }
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (index < totalSlidesCount - visibleSlidesCount) {
                index++;
                updateActiveImg(index);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateActiveImg(index);
            }
        });
    }

    slideItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            updateActiveImg(i);
        });
    });

    updateActiveImg(0);

    // setInterval(() => {
    //     if (index < totalSlidesCount - visibleSlidesCount) {
    //         index++;
    //     } else {
    //         index = 0;
    //     }
    //     updateActiveImg(index);
    // }, 5000);
});

//Message for copy and print

// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById("print").addEventListener("click", () => {
//         window.print();
//       });

//       document.getElementById("download").addEventListener('click', () => {
//         const fileUrl = ".pdf";
//         const link = document.createElement('a');
//         link.href= fileUrl;
//         link.download = "sample.pdf"
//         document.body.appendChild(link);
//         link.click()
//       })

//       document.getElementById("link").addEventListener('click', () => {
//         const copiedLink = "https://sample.com";
//         navigator.clipboard.writeText(copiedLink)
//         .then(() => {
//             const message = document.getElementById("message");
//             message.style.display = "block";
//             setTimeout(() => {
//                 message.style.display="none"
//             }, 5000)
//         }). catch (err => console.error("Возникла ошибка при копировнаии", err))

//       })
// })



document.addEventListener('DOMContentLoaded', function () {

  const downloadBtn = document.getElementById('download');
  const popup = document.getElementById('pdf-popup');
  const closeBtn = document.getElementById('btn-close-popup-dnld');
  const popupDownloadBtn = document.querySelector('.popup .product-btn');
  const printBtn = document.getElementById('print');
  const linkBtn = document.getElementById('link');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      popup.style.display = 'flex'; 
    });
  }

  if (popupDownloadBtn) {
    popupDownloadBtn.addEventListener('click', () => {
      const fileUrl = "sample.pdf";
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'sample.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
      popup.style.display = 'none'; 
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  window.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });

 
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }


  if (linkBtn) {
    linkBtn.addEventListener('click', () => {
      const copiedLink = 'https://sample.com';
      navigator.clipboard.writeText(copiedLink)
        .then(() => {
          const message = document.getElementById('message');
          if (message) {
            message.style.display = 'block';
            setTimeout(() => {
              message.style.display = 'none';
            }, 5000);
          }
        })
        .catch((err) => console.error('Error copying link:', err));
    });
  }
});



//Switch between tabs

document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".li-item")
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const tabID = this.getAttribute("data-tab");
            tabs.forEach(item => item.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(tabID).classList.add("active")
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const reviewsBlock = document.getElementById("reviews");

    if (reviewsBlock) {
        if (!reviewsBlock.querySelector(".reviews-item")) {
            reviewsBlock.innerHTML = "<div>Отзывов пока нет</div>";
            reviewsBlock.classList.add('noreviews')
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const reviewsBlock = document.getElementById("questions");
    if (reviewsBlock) {
        if (!reviewsBlock.querySelector(".question-item")) {
            reviewsBlock.innerHTML = "<div >Отзывов пока нет</div>";
            reviewsBlock.classList.add('noreviews')
        }
    }
});

// Scroll

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("scroll", () => {
      const productItem = document.querySelector(".product-item");
      const floatingBlock = document.querySelector(".floating");

      if (!productItem || !floatingBlock) return;

      const productItemBottom = productItem.getBoundingClientRect().bottom;

      if (productItemBottom < -100) {
        floatingBlock.classList.remove("hidden");
        floatingBlock.classList.add("visible");
      } else {
        floatingBlock.classList.remove("visible");
        floatingBlock.classList.add("hidden");
      }
  });
});

// Mobile assembly toggle parts

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".parts-name").forEach((header) => {
    header.addEventListener("click", function () {
      const section = this.parentElement;

          this.classList.toggle("active");

      section.querySelectorAll(".computer-part").forEach((part) => {
        part.style.display = part.style.display === "none" ? "flex" : "none";
      });
    });
  });
});

// Displayed page view (grid/list)

// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".view-btn");
//   const listView = document.getElementById("list-view");
//   const gridView = document.getElementById("grid-view");

//   function switchView(view) {
//     if (view === "grid") {
//       if (listView) listView.classList.add("hidden");
//       if (gridView) gridView.classList.remove("hidden");
//     } else {
//       if (gridView) gridView.classList.add("hidden");
//       if (listView) listView.classList.remove("hidden");
//     }
//   }

//   buttons.forEach(button => {
//     button.addEventListener("click", function () {
//       buttons.forEach(btn => btn.classList.remove("active"));
//       this.classList.add("active");
//       switchView(this.dataset.view);
//     });
//   });

//   const mobileViewButtons = document.querySelectorAll(".view-switcher.mobile-switcher .view-btn");

//   mobileViewButtons.forEach(button => {
//     button.addEventListener("click", function() {
//       const currentView = this.dataset.view;
//       const newView = currentView === "grid" ? "list" : "grid";
  
//       // Update the clicked button
//       this.dataset.view = newView;
//       this.innerHTML = newView === "grid" ?
//         `<span><div></div><div></div><div></div><div></div></span>` :
//         `<span></span>`;
  
//       // Optional: If you want to sync all buttons to the same view
//       // mobileViewButtons.forEach(btn => {
//       //   btn.dataset.view = newView;
//       //   btn.innerHTML = newView === "grid" ?
//       //     `<span><div></div><div></div><div></div><div></div></span>` :
//       //     `<span></span>`;
//       // });
  
//       switchView(newView);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".view-btn");
    const listView = document.getElementById("list-view");
    const gridView = document.getElementById("grid-view");

    function switchView(view) {

        window.currentView = view;
        if (view === "grid") {
            if (listView) listView.classList.add("hidden");
            if (gridView) gridView.classList.remove("hidden");
        } else {
            if (gridView) gridView.classList.add("hidden");
            if (listView) listView.classList.remove("hidden");
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            switchView(this.dataset.view);
        });
    });

    const mobileViewButton = document.querySelector(".view-switcher.mobile-switcher .view-btn");
    if (mobileViewButton) {
        mobileViewButton.addEventListener("click", function () {
            const currentView = this.dataset.view;
            const newView = currentView === "grid" ? "list" : "grid";

            this.dataset.view = newView;
            this.innerHTML = newView === "grid" ?
                `<span><div></div><div></div><div></div><div></div></span>` :
                `<span></span>`;

            switchView(newView);
        });
    }
});

// Mobile filter opening

// document.addEventListener("DOMContentLoaded", function () {
//   const filterToggle = document.getElementById('filter-toggle');
//   const aside = document.querySelector('aside');
//   const closeFilter = document.getElementById('close-filter');
//   const body = document.body;

//   if (filterToggle && aside) {
//     filterToggle.addEventListener('click', function () {
//       aside.style.display = 'block';
//       body.classList.add('filter-active');
//     });
//   }

//   if (closeFilter && aside) {
//     closeFilter.addEventListener('click', function () {
//       aside.style.display = 'none';
//       body.classList.remove('filter-active');
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const filterToggles = document.querySelectorAll('.filter-toggle');
  const aside = document.querySelector('aside');
  const closeFilter = document.getElementById('close-filter');
  const body = document.body;

  if (filterToggles.length && aside) {
    filterToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function () {
        aside.style.display = 'block';
        body.classList.add('filter-active');
      });
    });
  }

  if (closeFilter && aside) {
    closeFilter.addEventListener('click', function () {
      aside.style.display = 'none';
      body.classList.remove('filter-active');
    });
  }
});

// price

document.addEventListener("DOMContentLoaded", function () {
    // Функция для инициализации логики слайдера
    function initSlider(section) {
        const rangeInputs = section.querySelectorAll(".range-input input");
        const priceInputs = section.querySelectorAll(".filter-price-input input");
        const progress = section.querySelector(".price-slider .progress");

        if (!rangeInputs.length || !priceInputs.length || !progress) {
            return;
        }

        let priceGap = 500;

        function updateSlider() {
            let minVal = parseFloat(rangeInputs[0].value),
                maxVal = parseFloat(rangeInputs[1].value),
                maxLimit = parseFloat(rangeInputs[1].max);

            if (maxVal - minVal >= priceGap) {
                priceInputs[0].value = minVal.toFixed(2);
                priceInputs[1].value = maxVal.toFixed(2);
                progress.style.left = (minVal / maxLimit) * 100 + "%";
                progress.style.right = 100 - (maxVal / maxLimit) * 100 + "%";
            }
        }

        function updateInput() {
            let minPrice = parseFloat(priceInputs[0].value),
                maxPrice = parseFloat(priceInputs[1].value),
                maxLimit = parseFloat(rangeInputs[1].max);

            if (maxPrice - minPrice >= priceGap && maxPrice <= maxLimit) {
                rangeInputs[0].value = minPrice;
                rangeInputs[1].value = maxPrice;
                progress.style.left = (minPrice / maxLimit) * 100 + "%";
                progress.style.right = 100 - (maxPrice / maxLimit) * 100 + "%";
            }
        }

        rangeInputs.forEach((input) => input.addEventListener("input", updateSlider));
        priceInputs.forEach((input) => input.addEventListener("input", updateInput));

        updateSlider();
    }

    // Инициализация для существующих элементов
    const filterSections = document.querySelectorAll(".filter-section.price");
    filterSections.forEach((section) => initSlider(section));

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                // Проверяем, является ли добавленный элемент .filter-section.price
                if (node.nodeType === 1 && node.classList.contains("filter-section") && node.classList.contains("price")) {
                    initSlider(node); // Инициализируем слайдер для нового элемента
                }
            });
        });
    });

    // Начинаем наблюдение за изменениями в body (или другом контейнере)
    observer.observe(document.body, {
        childList: true, // Наблюдаем за добавлением/удалением дочерних элементов
        subtree: true,   // Наблюдаем за всеми вложенными элементами
    });
});

document.addEventListener('DOMContentLoaded', function () {

     document.addEventListener("click", function (event) {
         const dropdownHeader = event.target.closest(".dropdown-header");
         if (dropdownHeader) {
             const filterSection = dropdownHeader.closest(".filter-section");
             const dropdownContent = filterSection.querySelector(".dropdown-content");
             dropdownContent.classList.toggle('show');
             filterSection.classList.toggle('open');
         }
     });

    // dropdown search
    const searchInputs = document.querySelectorAll('.dropdown-content .search');

    searchInputs.forEach(searchInput => {
      searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const options = this.closest('.dropdown-content').querySelectorAll('.options label');

        options.forEach(option => {
          option.style.display = option.textContent.toLowerCase().includes(searchText) ? "block" : "none";
        });
      });
    });
  });

  // Mobile ads slides

  document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".ads-slide");
    const dotsContainer = document.querySelector(".dots-container");
    const adsPictures = document.querySelector(".ads-pictures");
    let currentSlide = 0;
    let slidesToShow = 1;

    function updateSlidesToShow() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) {
            slidesToShow = 4;
        } else if (screenWidth >= 1024) {
            slidesToShow = 3;
        } else if (screenWidth >= 768) {
            slidesToShow = 2;
        } else {
            slidesToShow = 1;
        }
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        if (slidesToShow < slides.length) {
            for (let i = 0; i <= slides.length - slidesToShow; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.addEventListener("click", () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
    }

    function showSlides() {
        updateSlidesToShow();
        createDots();
        const dots = document.querySelectorAll(".dot");

        slides.forEach((slide) => {
            slide.style.display = "none";
        });

        for (let i = currentSlide; i < currentSlide + slidesToShow; i++) {
            if (slides[i]) {
                slides[i].style.display = "block";
            }
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
        if (dotsContainer) {
            dotsContainer.style.display = slidesToShow === slides.length ? "none" : "block";
        }
        if (adsPictures) {
            adsPictures.style.justifyContent = slidesToShow < slides.length ? "flex-start" : "center";
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlides();
    }

    showSlides();
    setInterval(() => {
        currentSlide = (currentSlide + 1) % (slides.length - slidesToShow + 1);
        showSlides();
    }, 5000);

    window.addEventListener("resize", showSlides);
});

  // Mobile slider for assembly page pictures

  document.addEventListener("DOMContentLoaded", function () {
    const DOT_COLORS = ["#626263", "#A0A1A1", "#C0C0C1", "#D9D9DA"];

    const mobileSlider = document.getElementById("assemblyMobileSlider");
    if (!mobileSlider) return;
    const slider = mobileSlider.querySelector(".mobile-slides");
    const slides = mobileSlider.querySelectorAll(".mobile-slide");
    const dotsContainer = mobileSlider.querySelector(".mobile-slider-dots");

    let currentIndex = 0;
    let autoScroll = true;
    let interval;
    let startX = 0;
    let endX = 0;

    function getDotColor(dotIndex, activeDotIndex) {
      const diff = Math.abs(activeDotIndex - dotIndex);
      const colorIndex = Math.min(diff, DOT_COLORS.length - 1);
      return DOT_COLORS[colorIndex];
    }

    function updateSlider(selectedIndex) {
      slider.style.transform = `translateX(-${selectedIndex * 100}%)`;
      mobileSlider.querySelectorAll(".dot").forEach((dot, dotIndex) => {
        dot.style.backgroundColor = getDotColor(selectedIndex, dotIndex);
      });
    }

    function createDots() {
      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.backgroundColor = getDotColor(currentIndex, index);
        dot.addEventListener("click", () => {
          autoScroll = false;
          currentIndex = index;
          updateSlider(index);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function startAutoScroll() {
      interval = setInterval(() => {
        if (autoScroll) {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlider(currentIndex);
        }
      }, 3000);
    }

    function nextSlide() {
      autoScroll = false;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider(currentIndex);
    }

    function prevSlide() {
      autoScroll = false;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(currentIndex);
    }

    function handleTouchStart(event) {
      startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
      event.preventDefault();
      endX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
      const diff = startX - endX;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    createDots();
    startAutoScroll();
  });

