/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosStatic, AxiosInstance, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> extends AxiosResponse<T> {
}
class ApiFormData {
  public request: AxiosInstance

  constructor(protected axiosStatic: AxiosStatic = axios) {
    this.request = axiosStatic.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  public async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.post<T>(url, body)
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

const apiFormData = new ApiFormData()

const urls = {
  users: {
    create: '/users/create/',
    edit: '/users/edit/',
    upload: '/users/upload',
    login: '/users/login/',
    findAll: '/users/',
    findMe: '/users/find-me/',
  },
  properties: {
    create: '/properties/create/',
    findAll: '/properties/',
    findOne: '/properties/',
  },
  characteristcs: {
    create: '/characteristics/create/',
    findAll: '/characteristics/',
  },
  contacts: {
    create: '/contacts/create/',
    edit: '/contacts/edit/',
    findAll: '/contacts/',
  },
  utils: {
    purposes: '/utils/purposes',
    types: '/utils/types',
    states: '/utils/states',
  },
  register: {
    keep: '/verificar-email/',
  },
  images: 'http://localhost:21291/uploads/',
  zipcode: 'https://viacep.com.br/ws/#zipcode/json/',
}

export {
  apiFormData, urls,
}
