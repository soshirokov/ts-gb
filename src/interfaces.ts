export interface ISearchFormData { 
  'city': string,
  'coordinates': [number, number],
  'check-in-date': Date,
  'check-out-date': Date,
  'max-price': number,
}

export interface IPlaces { 
  id: number,
  image:	string,
  name:	string,
  description:	string,
  remoteness:	number,
  bookedDates: number[],
  price: number
}

export interface IUser { 
  username: string,
  avatarUrl: string
}

export interface IRequestParams {
  method: 'GET' | 'PATCH',
  endPoint: string,
  parameters: IGetPlaceParams | IFindPlacesParams | IBookPlaceParams
}

export interface IGetPlaceParams extends Record<string, string | number> {
  id: number,
  coordinates?: string,
}

export interface IFindPlacesParams extends Record<string, string | number> {
  coordinates: string,
  checkInDate: number,
  checkOutDate: number,
  maxPrice?: number
}

export interface IBookPlaceParams extends Record<string, number> {
  id: number,
  checkInDate: number,
  checkOutDate: number
}
