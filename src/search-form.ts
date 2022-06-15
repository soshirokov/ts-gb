import { renderBlock } from './lib.js'
import { IPlaces, ISearchFormData } from './interfaces.js'

const TWO_DAYS = 2
const ONE_MONTH = 1
const TWO_MONTHS = 2

const getStringFromDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + ONE_MONTH).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2,'0')

  return `${year}-${month}-${day}`
}
const getDateFromString = (date: string): Date => new Date(+date.split('-')[0], +date.split('-')[1], +date.split('-')[2])

const minDate: Date = new Date();
const maxDate: Date = new Date(minDate.getFullYear(), minDate.getMonth() + ONE_MONTH, (new Date(minDate.getFullYear(), minDate.getMonth() + TWO_MONTHS, 0)).getDate())
const minCheckoutDate: Date = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + TWO_DAYS)

export function renderSearchFormBlock(dateStart: string = getStringFromDate(minDate), dateEnd: string = getStringFromDate(minCheckoutDate)) {
  const dateStartFromString = getDateFromString(dateStart)
  const dateEndFromString = getDateFromString(dateEnd)
  
  renderBlock(
    'search-form-block',
    `
    <form action="#" id="searchForm">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" value="Санкт-Петербург" />
            <input name="coordinates" type="hidden" value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" name="check-in-date" type="date" value="${dateStartFromString >= minDate ? dateStart : getStringFromDate(minDate)}" min="${getStringFromDate(minDate)}" max="${getStringFromDate(maxDate)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" name="check-out-date" type="date" value="${dateEndFromString <= maxDate ? dateEnd : getStringFromDate(maxDate)}" min="${getStringFromDate(minCheckoutDate)}" max="${getStringFromDate(maxDate)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  document.querySelector('form#searchForm').addEventListener('submit', getSearchFormData)
}

function getSearchFormData(e: Event): void { 
  e.preventDefault();

  const form = new FormData(document.querySelector('form#searchForm'))

  const formValues = {
    city: form.get('city').toString(),
    coordinates: [parseFloat(form.get('coordinates').toString().split(',')[0]), parseFloat(form.get('coordinates').toString().split(',')[1])],
    checkInDate: getDateFromString(form.get('check-in-date').toString()),
    checkOutDate: getDateFromString(form.get('check-out-date').toString()),
    maxPrice: isNaN(parseInt(form.get('price').toString())) ? 0 : parseInt(form.get('price').toString())
  }

  const searchFormData: ISearchFormData = {
    'city': formValues.city,
    'coordinates': [formValues.coordinates[0], formValues.coordinates[1]],
    'check-in-date': formValues.checkInDate,
    'check-out-date': formValues.checkOutDate,
    'max-price': formValues.maxPrice
  }
  
  search(searchFormData, delay)
}

export function search(params: ISearchFormData, render: (err?: Error, places?: IPlaces[]) => void): void { 
  setTimeout(() => {
    const rand = Math.random() * 10
    rand >= 5 ? render(new Error('Ошбика поиска')) : render(null, [])
  }, 2000)
}

function delay(err?: Error, places?: IPlaces[]): void { 
  if (err) { 
    throw err
  }

  if (places) { 
    console.log(places);
  }
}
