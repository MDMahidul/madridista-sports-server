import { Model } from "mongoose";

export type TBlogCategory =
  | 'Diet'
  | 'Lifestyle'
  | 'Sports'
  | 'Fitness'
  | 'Exercise'
  | 'Tools'
  | 'Health-Care';

export type TBlog = {
  blogTitle: string;
  category: TBlogCategory;
  authorName: string;
  imageLink: string;
  description: string;
  isDeleted: boolean;
};


export interface BlogModel extends Model<TBlog> {
  // eslint-disable-next-line no-unused-vars
  isBlogExists(id: string): Promise<boolean>;
}