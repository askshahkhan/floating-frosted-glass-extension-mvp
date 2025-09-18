// Create floating box element
function createFloatingBox() {
  // Check if box already exists
  if (document.getElementById('floating-box')) {
    return;
  }

  const floatingBox = document.createElement('div');
  floatingBox.id = 'floating-box';
  floatingBox.innerHTML = `
    <div class="floating-box-header">
      <span>Floating Box</span>
      <button id="close-box" class="close-btn">×</button>
    </div>
    <div class="floating-box-content">
      <p>This is a floating box that can be dragged anywhere on the page!</p>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(floatingBox);
  
  // Make it draggable
  makeDraggable(floatingBox);
  
  // Add close functionality
  const closeBtn = floatingBox.querySelector('#close-box');
  closeBtn.addEventListener('click', () => {
    floatingBox.remove();
  });

  console.log('Floating box created successfully');
}

// Make element draggable
function makeDraggable(element) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const header = element.querySelector('.floating-box-header');

  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
}

// Initialize floating box when page loads
function initializeFloatingBox() {
  // Wait for body to be available
  if (document.body) {
    createFloatingBox();
  } else {
    // If body isn't ready, wait for it
    const observer = new MutationObserver((mutations) => {
      if (document.body) {
        observer.disconnect();
        createFloatingBox();
      }
    });
    observer.observe(document.documentElement, { childList: true });
  }
}

// Run when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFloatingBox);
} else {
  initializeFloatingBox();
}

// Also run on page navigation (for SPAs)
window.addEventListener('load', initializeFloatingBox);
