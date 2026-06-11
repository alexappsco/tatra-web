const openFilterButton = document.getElementById('openFilter');
const closeFilterButton = document.getElementById('closeFilter');
const filterPanel = document.getElementById('filterPanel');
const filterOverlay = document.getElementById('filterOverlay');

function openFilter() {
  if (!filterPanel || !filterOverlay) return;
  filterPanel.classList.remove('translate-x-full');
  filterOverlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeFilter() {
  if (!filterPanel || !filterOverlay) return;
  filterPanel.classList.add('translate-x-full');
  filterOverlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

openFilterButton?.addEventListener('click', openFilter);
closeFilterButton?.addEventListener('click', closeFilter);
filterOverlay?.addEventListener('click', closeFilter);

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    filterPanel?.classList.remove('translate-x-full');
    filterOverlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
});
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();

    const parent = this.closest('.menu-item');
    const submenu = parent.querySelector('.submenu');

    // اقفل الباقي
    document.querySelectorAll('.submenu').forEach(m => {
      m.classList.add('hidden');
      m.style.position = '';
      m.style.top = '';
      m.style.left = '';
    });

    // احصل على مكان الزر
    const rect = this.getBoundingClientRect();

    submenu.classList.remove('hidden');

    submenu.style.position = 'fixed';
    submenu.style.top = rect.bottom + 'px';
    submenu.style.right = (window.innerWidth - rect.right) + 'px';
  });
});

// إغلاق عند الضغط خارج
document.addEventListener('click', () => {
  document.querySelectorAll('.submenu').forEach(m => {
    m.classList.add('hidden');
    m.style.position = '';
  });
});