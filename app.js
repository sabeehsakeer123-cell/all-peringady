const initialProfiles = [
  {name:'Fathima K.', area:'Central', members:5, note:'Near the old mosque', color:'#e8c6ae'},
  {name:'Muhammed R.', area:'North', members:4, note:'Kallayi Road', color:'#c9dac1'},
  {name:'Naseema & family', area:'South', members:6, note:'Peringady Junction', color:'#d9cae8'},
  {name:'Rashid P.', area:'Central', members:3, note:'Opp. public library', color:'#eadb9c'},
  {name:'Suhara M.', area:'North', members:7, note:'Thazhe Peringady', color:'#bcd9d4'},
  {name:'Ibrahim C.', area:'South', members:4, note:'Near the river road', color:'#e5b9b1'}
];
const saved = JSON.parse(localStorage.getItem('allPeringadyProfiles') || '[]');
let profiles = [...saved, ...initialProfiles];
const grid = document.querySelector('#profiles');
const search = document.querySelector('#search');
const colorFor = (name) => ['#e8c6ae','#c9dac1','#d9cae8','#eadb9c','#bcd9d4','#e5b9b1'][name.length % 6];
function render(){
  const q = search.value.trim().toLowerCase();
  const visible = profiles.filter(p => `${p.name} ${p.note} ${p.area}`.toLowerCase().includes(q));
  grid.innerHTML = visible.map(p => `<article class="profile"><div class="avatar" style="background:${p.color || colorFor(p.name)}">${p.name.charAt(0)}</div><span class="tag">${p.area}</span><h3>${p.name}</h3><p>${p.note || 'Peringady village'}</p><span class="members">${p.members} members</span></article>`).join('') || '<p>No households found yet.</p>';
  document.querySelector('#resultText').textContent = `Showing ${visible.length} of ${128 + saved.length} households`;
  document.querySelector('#householdCount').textContent = 128 + saved.length;
  document.querySelector('#peopleCount').textContent = 542 + saved.reduce((n,p)=>n + Number(p.members),0);
}
search.addEventListener('input', render);
document.querySelector('#joinForm').addEventListener('submit', e => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget)); const entry={...data, color:colorFor(data.name)}; saved.unshift(entry); localStorage.setItem('allPeringadyProfiles',JSON.stringify(saved)); profiles=[...saved,...initialProfiles]; e.currentTarget.reset(); document.querySelector('#success').textContent='Your household has been added to the circle.'; render(); document.querySelector('#directory').scrollIntoView({behavior:'smooth'}); });
render();

const cookieNotice = document.querySelector('#cookieNotice');
if (!localStorage.getItem('allPeringadyCookieChoice')) cookieNotice.hidden = false;
function hideCookieNotice(){
  localStorage.setItem('allPeringadyCookieChoice', 'acknowledged');
  cookieNotice.hidden = true;
}
document.querySelector('#cookieAccept').addEventListener('click', hideCookieNotice);
document.querySelector('#cookieClose').addEventListener('click', hideCookieNotice);
