import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios'

type NoticeType = "info" | "success" | "error" | "warning" | "loading";

export interface IArticle {
	id: number;
  title: string;
  content: string[];
  tag: string
  updatedAt: number;
 	createdAt: number;
  likes: number;
  user: Pick<IUserInfo, 'username' | 'id' | 'avatarUrl'>;
}

export interface IUserInfo {
	id: number;
	username: string;
	email: string;
  bio: string;
  age: number;
	gender: string;
	createdAt: number;
	updatedAt: number;
	refresh_token?: string;
	imageUrl: string;
	avatarUrl: string;
	likedArticle: IArticle[];
}

export interface IAxiosResponse<T> {
	data: T
	status: number
	statusText: string
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders 
  config: InternalAxiosRequestConfig<T>
}

export interface IAxiosErrorResponse {
	statusText: string
	data: {message: string}
	statusCode: number;
}

export interface IGroupArticle<T> {
	tag: string,
	articles: IPaginatedResponse<IArticle>
}

export interface IPaginatedResponse <T>{
	items: T[],
	meta: IPagnationMeta,
}

export interface IPagnationMeta {
	currentPage: number,
	itemCount: number,
	itemsPerPage: number,
	totalItems: number,
	totalPages: number,
}

export interface IArticleRequestData {
	articleId?: string;
	tag?: string;
	username?: string;
}

export interface IUserArticle<T> {
	username: string,
	articles: IPaginatedResponse<IArticle>
}

export interface ITagOption {
	label: string;
	value: string;
}

export interface IAdditionalArticleInfo {
	tags: ITagOption[],
	groupArticles: IGroupArticle<IArticle>[],
	userArticles: IUserArticle<IArticle>[],
}

export interface IAxiosErrorResponse {
	statusText: string
	data: {message: string}
	statusCode: number;
}

export interface IPaginationInfo {
	page: number,
  limit: number,
}

export interface INotification {
	content: string,
  type: NoticeType
}

export interface INavigateAction {
	navigate?: (data: string) => void
}

export interface INotificationAction {
	openNotification?: (data: INotification) => void
}

export interface ICallNotificationAction {
	type: NoticeType,
	message: string,
	error?: string,
}

export interface IUserInfo {
	id: number;
	username: string;
	email: string;
  bio: string;
  age: number;
	gender: string;
	createdAt: number;
	updatedAt: number;
	refresh_token?: string;
	imageUrl: string;
	avatarUrl: string;
	likedArticle: IArticle[];
}

export interface ILikeArticleResponse {
	user: IUserInfo
	groupArticles: IPaginatedResponse<IArticle>
}

export interface IFormData {
	formData: FormData
	cb?(): void,
}

export interface ISignIn {
	username?: string
	pass?: string
	remember?: boolean
	refresh_token?: string;
}

export interface ISignUp {
	username: string
	email: string
	pass: string
}

export interface IOtherAuthorInfo {
	username: string;
	email: string;
  bio: string;
  age: number;
	gender: string;
	avatarUrl: string;
}

export interface IInitialState {
	[k:string]: any;
}


export interface DynamicObject {
	[k:string]: any;
}


export interface AppState {
	article: DynamicObject,
	otherAuthorInfo: DynamicObject,
	userInfo: DynamicObject,
} 




