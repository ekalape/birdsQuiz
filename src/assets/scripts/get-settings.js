export default function getSettings() {
  if (localStorage.getItem('eklp_brdsqz_settings')) {
    console.log('getItem');
    return JSON.parse(localStorage.getItem('eklp_brdsqz_settings'));
  } else return { language: 'en', theme: 'dark' };
}
