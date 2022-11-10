import request from '@/utils/request'

/**
 * 获取构建好的菜单数据
 * @param param
 * @returns {*}
 */
export function build(param) {
  return request({
    url: '/menu/build',
    method: 'get',
    param,
  })
}