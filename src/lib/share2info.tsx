export const share2info: {
  [key: string]: string;
}[] = [
  // id는 배열 인덱스로 사용
  {
    src: `${process.env.PUBLIC_URL}/images/sns/email.png`,
    alt: 'email',
    name: '이메일',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/katalk.png`,
    alt: 'kakaotalk',
    name: '카카오톡',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/facebook.png`,
    alt: 'facebook',
    name: '페이스북',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/instagram.png`,
    alt: 'instagram',
    name: '인스타그램',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/naver-blog.png`,
    alt: 'naver blog',
    name: '네이버\n블로그',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/naver-band.png`,
    alt: 'naver band',
    name: '네이버밴드',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/sns/pinterest.png`,
    alt: 'pinterest',
    name: '핀터레스트',
  },
];
