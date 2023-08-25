import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blog.reducer';

export const selectBlogsState = createFeatureSelector<BlogState>('blog');

export const selectBlogs = createSelector(
  selectBlogsState,
  (state: BlogState) => {
    return state.blogs;
  }
);

export const selectBlogsLoadingStatus = createSelector(
  selectBlogsState,
  (state: BlogState) => {
    return state.blogsLoadingStatus;
  }
);

export const selectBlog = createSelector(
  selectBlogsState,
  (state: BlogState) => {
    return state.blog;
  }
);

export const selectBlogLoadingStatus = createSelector(
  selectBlogsState,
  (state: BlogState) => {
    return state.blogLoadingStatus;
  }
);