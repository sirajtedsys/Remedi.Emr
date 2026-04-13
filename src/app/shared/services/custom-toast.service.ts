import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {
showToast(arg0: string) {
  throw new Error('Method not implemented.');
}

constructor() { }



// In your service file (or wherever showCustomToast is defined)

// In your service file (or wherever showCustomToast is defined)

showCustomToast(
  message: string,
  color: string = '',
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right',
duration = 3000
) {
  // Construct the specific container ID based on the position
  const containerId = `custom-toast-container-${position}`;
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Toast container not found for position: <span class="math-inline">\{position\}\. Please ensure '</span>{containerId}' exists in your HTML.`);
    return;
  }

  // Ensure the container has its base styles (if you remove the class from HTML)
  // Or simply make sure .custom-toast-container-styles is applied in HTML
  // No need to clear .cssText here if styles are static in CSS and dynamic part is only for position.
  // However, if you're setting position dynamically via JS, then clearing is good.
  // Let's keep the positioning logic dynamic but make sure the base container itself exists.

  // Apply specific positioning styles to the correct container
  container.style.position = 'fixed';
  container.style.display = 'flex';
  container.style.gap = '10px';
  container.style.zIndex = '9999';
  container.style.pointerEvents = 'none'; // Essential for clicks to pass through container

  switch (position) {
    case 'top-right':
      container.style.top = '20px';
      container.style.right = '20px';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'flex-end';
      break;
    case 'top-left':
      container.style.top = '20px';
      container.style.left = '20px';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'flex-start';
      break;
    case 'bottom-right':
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.flexDirection = 'column-reverse'; // Stack upwards
      container.style.alignItems = 'flex-end';
      break;
    case 'bottom-left':
      container.style.bottom = '20px';
      container.style.left = '20px';
      container.style.flexDirection = 'column-reverse'; // Stack upwards
      container.style.alignItems = 'flex-start';
      break;
    case 'top-center':
      container.style.top = '20px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
      break;
    case 'bottom-center':
      container.style.bottom = '20px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      container.style.flexDirection = 'column-reverse';
      container.style.alignItems = 'center';
      break;
  }

  // Create and append the toast element as before
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.textContent = message;

  if (color) {
    toast.style.setProperty('--toast-bg-color', color);
  } else {
    toast.style.setProperty('--toast-bg-color', '#333');
  }

  container.appendChild(toast); // Add toast to the correct, position-specific container

  setTimeout(() => {
    toast.remove();
  }, duration);
}

}
