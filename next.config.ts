import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  async headers() {
    return [
      {
        // 동적 라우팅 URL에 대해 캐시 무효화 설정
        source: '/itemdetail/:id', // 여기서는 예시로 itemdetail/[id] 동적 페이지를 설정
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',  // 캐시 저장을 하지 않도록 설정
          },
        ],
      },
      {
        source: '/api/cart/mycart/:id', // 동적 라우팅 API 경로 설정
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',  // 캐시 저장을 하지 않도록 설정
          },
        ],
      },
    ];
  },
};

export default nextConfig;
