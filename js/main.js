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
