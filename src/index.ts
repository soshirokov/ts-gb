import { renderSearchFormBlock, search } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { getFavoritesAmount, getUserData, renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

window.addEventListener('DOMContentLoaded', () => {
  const storageUserData = JSON.parse(localStorage.getItem('user'));
  const userData = getUserData(storageUserData)
  const favoritesAmount = getFavoritesAmount(storageUserData)
  renderUserBlock(userData.username, userData.avatarUrl, favoritesAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})

/* Для тестирования user из localStorage */
localStorage.setItem('user', JSON.stringify({ username: 'Wade Warren', avatarUrl: '/img/avatar.png', favoritesAmount: '12'}));
