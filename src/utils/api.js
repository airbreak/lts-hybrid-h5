import fetch from './axios'
export const getProduct = data => fetch('/insurance/product', data)
export const getArt = data => fetch('/insuranceArticle/html5/' + data)
export const getDownload = data => fetch('/insuranceVersion/download', data)
export const getLoan = data => fetch('/insurance/loan/product/geth5info', data)
// 关注
export const focusUser = data => fetch('ucapi/userFocus/focus', data)
// 获取文章详情
export const getArticleDetail = (data) => fetch('lts/article/detail', data)
