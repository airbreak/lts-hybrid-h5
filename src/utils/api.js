import fetch from './axios'
// 关注
export const focusUser = data => fetch('ucapi/userFocus/focus', data)
// 获取文章详情
export const getArticleDetail = (data) => fetch('lts/article/detail', data)
