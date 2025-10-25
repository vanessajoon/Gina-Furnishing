const navbarToggle = document.querySelector('.navbar-toggle');
const sidebar = document.querySelector('.sidebar');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
})
