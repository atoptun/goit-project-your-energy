export type TFilterCategory = 'Muscles' | 'Body parts' | 'Equipment';

export interface ICategory {
    "filter": TFilterCategory;
    "name": string;
    "imgURL": string
}