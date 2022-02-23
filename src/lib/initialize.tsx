// global scope
declare global {
  interface Window {
    Kakao: any;
    PinUtils: any;
  }

  interface String {
    format: Function;
  }
}

// eslint-disable-next-line no-extend-native
String.prototype.format = function format(): string {
  let args = arguments;
  return args[0].replace(
    /{(\d+)}/g,
    function (match: string, num: string | number) {
      num = Number(num) + 1;
      return typeof args[num] != undefined ? args[num] : match;
    },
  );
};

const { Kakao } = window;

export function kakaoInit() {
  Kakao.init('6b779101915092df9bebdc099a3ecf42');
  console.log(
    Kakao.isInitialized() ? 'kakao init succeeded' : 'kaka init failed',
  );
}

export function share2NaverBlog(
  url: string,
  title: string,
  width: number,
  height: number,
) {
  const encodeUrl = encodeURIComponent(url);
  const encodeTitle = encodeURIComponent(title);
  const shareLink =
    'https://share.naver.com/web/shareView.nhn?url={0}&title={1}';
  const link = shareLink.format(encodeUrl, encodeTitle);
  window.open(link, 'share', `width=${width}, height=${height}`);
}

export function share2NaverBand(
  url: string,
  content: string,
  width: number,
  height: number,
) {
  const encodeBody = encodeURIComponent('{0}\n{1}'.format(content, url));
  const encodeRoute = encodeURIComponent(window.location.href);
  const shareLink = 'http://band.us/plugin/share?body={0}&route={1}';
  const link = shareLink.format(encodeBody, encodeRoute);
  window.open(link, 'share', `width=${width}, height=${height}`);
}

export function share2Pinterest(
  url: string,
  text: string,
  width: number,
  height: number,
) {
  const imgSrc = `${process.env.PUBLIC_URL}/vote-it_LOGO.png`;
  const encodeURL = encodeURIComponent(url);
  const encodeIMG = encodeURIComponent(imgSrc);
  const encodeTXT = encodeURIComponent(text);
  const link = `https://www.pinterest.co.kr/pin/create/button/?url=${encodeURL}&media=${encodeIMG}&description=${encodeTXT}`;
  window.open(link, 'pinterest', `width=${width}, height=${height}`);
}

export function share2Twitter(
  url: string,
  text: string,
  width: number,
  height: number,
) {
  const encodeURL = encodeURIComponent(url);
  const encodeTXT = encodeURIComponent(text);
  const link = `http://twitter.com?status="${encodeTXT}" ${encodeURL}`;
  window.open(link, 'twitter', `width=${width}, height=${height}`);
}
