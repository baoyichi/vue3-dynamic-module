import request from '@/api';

export const getJson = () => {
  return request.get({
    url: 'Bing-Wallpaper-Action/main/data/zh-CN_all.json'
  });
}

