/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosStatic, AxiosInstance, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> extends AxiosResponse<T> {
}
class Api {
  public request: AxiosInstance

  constructor(protected axiosStatic: AxiosStatic = axios) {
    this.request = axiosStatic.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  }

  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request.get<T>(url, { params })
  }

  public async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.post<T>(url, body)
  }

  public async put<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.put<T>(url, body)
  }

  public async patch<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.patch<T>(url, body)
  }

  public async delete<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request.delete<T>(url, { params })
  }

  public setToken(token: string): void {
    this.request.defaults.headers.common = {
      'x-access-token': `${token}`,
    }
  }

  public removeToken(): void {
    this.request.defaults.headers.common = {
      Authorization: '',
    }
  }

  public hasToken(): boolean {
    return !!this.request.defaults.headers.common.Authorization
  }
}

const api = new Api()

const urls = {
  users: {
    create: '/users/create/',
    edit: '/users/edit/',
    upload: '/users/upload',
    login: '/users/login/',
    findAll: '/users/',
    findMe: '/users/find-me/',
    findUsername: '/users/find-username',
  },
  properties: {
    create: '/properties/create/',
    update: '/properties/update/',
    findAll: '/properties/',
    findOne: '/properties/',
    uploadPhotos: '/properties/upload/',
  },
  characteristcs: {
    create: '/characteristics/create/',
    findAll: '/characteristics/',
  },
  contacts: {
    create: '/contacts/create/',
    edit: '/contacts/edit/',
    read: '/contacts/read/',
    findAll: '/contacts/',
    findOpen: '/contacts/unread/',
  },
  utils: {
    purposes: '/utils/purposes',
    types: '/utils/types',
    states: '/utils/states',
  },
  register: {
    keep: '/verificar-email/',
  },
  advertise: {
    create: '/advertise/',
    findAll: '/advertise/findAll',
  },
  financing: {
    create: '/financing/',
    findAll: '/financing/findAll',
  },
  images: 'http://localhost:21291/uploads/',
  zipcode: 'https://viacep.com.br/ws/#zipcode/json/',
  findCities: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/#uf/distritos?orderBy=nome',
  geocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
}

export {
  api, urls,
}
