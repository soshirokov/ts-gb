import { renderBlock } from './lib.js'

export function renderUserBlock (userName: string, avatarLink: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}

export function getUserData(user: unknown): { username: string, avatarUrl: string } {   
  const emptyUser = {
    username: 'unknown',
    avatarUrl: '/img/empty.png'
  }
  
  const result = {
    username: null,
    avatarUrl: null
  }

  if (typeof user !== 'object' || !user) {
    return emptyUser
  } 
  
  Object.hasOwn(user, 'username') && user['username'] ? result.username = user['username'] : result.username = emptyUser.username
  Object.hasOwn(user, 'avatarUrl') && user['avatarUrl'] ? result.avatarUrl = user['avatarUrl'] : result.avatarUrl = emptyUser.avatarUrl

  return result
}

export function getFavoritesAmount(user: unknown): number { 
  if (typeof user !== 'object' || !user) {
    return 0
  } 

  if (!Object.hasOwn(user, 'favoritesAmount') || !user['favoritesAmount'].length) { 
    return 0
  }

  const result = parseInt(user['favoritesAmount'])
  

  return isNaN(result) ? 0 : result
}
