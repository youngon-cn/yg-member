export const common = {
  auth_url: 'https://auth.youngon.work',
  query_param_name: 'redirect',
  asset_base_url: 'https://api.wangxuefeng.com.cn/static/assets',
  default_head:
    'https://api.wangxuefeng.com.cn/static/assets/default/defaulthead.jpg'
}

export const app = {
  api_9813_url: 'https://member.youngon.work/member/api/9813',
  api_af13_url: (grade: number) =>
    `https://api.wangxuefeng.com.cn/users/get/gradestaff?grade=${grade}`,
  grade: {
    start: 2014,
    end: new Date().getFullYear()
  },
  account: 'https://api.wangxuefeng.com.cn/index/index/account'
}

export const members_card = {
  admission_url: (stuid: string) => `https://member.youngon.work/admission/${stuid}/en_US`,
  card_url: (stuid: string) => `https://member.youngon.work/card/${stuid}/`,
}
