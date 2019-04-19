export const common = {
  auth_url: 'https://auth.youngon.work',
  query_param_name: 'redirect',
  asset_base_url: 'https://api.wangxuefeng.com.cn/static/assets',
  default_head:
    'https://api.wangxuefeng.com.cn/static/assets/default/defaulthead.jpg'
}

export const app = {
  api_9813_url: 'https://member.youngon.work/member/api/9813',
  api_af13_url: grade =>
    `https://api.wangxuefeng.com.cn/users/get/gradestaff?grade=${grade}`,
  grade: {
    start: 2014,
    end: new Date().getFullYear()
  }
}

export const members_card = {
  admission_url: stuid => `https://member.youngon.work/admission/${stuid}/en_US`
}
