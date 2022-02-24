export interface IPost {
  id: number;
  page?: number;
  subject: string;
  author: string;
  isPrivate?: boolean;
  createdAt: string;
  expirationDate: string;
}

export const getPostList = (page: number): IPost[] => {
  return postList.filter((post: IPost) => post.page === page);
};

export const getPostById = (id: number) => {
  return postList.filter((obj) => obj.id === id)[0];
};

// {
//   id : "",
//   subject: "",
//   authorId: "",
//   isPrivate: "",
//   createdAt: "",
//   expirationDate: ""
// }

export const postList: IPost[] = [
  {
    id: 0,
    page: 1,
    subject: 'dummy1',
    author: '민범',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-28',
  },
  {
    id: 1,
    page: 1,
    subject: 'dummy2',
    author: '명우',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-20',
  },
  {
    id: 2,
    page: 1,
    subject: 'dummy3',
    author: '윤정',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-27',
  },
  {
    id: 3,
    page: 1,
    subject: 'dummy4',
    author: '영우',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-08',
  },
  {
    id: 4,
    page: 1,
    subject: 'dummy5',
    author: '윤정',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-28',
  },
  {
    id: 5,
    page: 1,
    subject: 'dummy6',
    author: '민범',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-27',
  },
  {
    id: 6,
    page: 1,
    subject: 'dummy7',
    author: '명우',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-19',
  },
  {
    id: 7,
    page: 1,
    subject: 'dummy8',
    author: '명우',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-21',
  },
  {
    id: 8,
    page: 2,
    subject: 'dummy9',
    author: '영우',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-21',
  },
  {
    id: 9,
    page: 2,
    subject: 'dummy10',
    author: '윤정',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-21',
  },
  {
    id: 10,
    page: 2,
    subject: 'dummy11',
    author: '민범',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-21',
  },
  {
    id: 11,
    page: 2,
    subject: 'dummy12',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 12,
    page: 2,
    subject: 'dummy13',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 13,
    page: 2,
    subject: 'dummy14',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 14,
    page: 2,
    subject: 'dummy15',
    author: 'duddn',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 15,
    page: 2,
    subject: 'dummy16',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-11',
  },
  {
    id: 16,
    page: 3,
    subject: 'dummy17',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 17,
    page: 3,
    subject: 'dummy18',
    author: 'auddn',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 18,
    page: 3,
    subject: 'dummy19',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 19,
    page: 3,
    subject: 'dummy20',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-12',
  },
  {
    id: 20,
    page: 3,
    subject: 'dummy21',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 21,
    page: 3,
    subject: 'dummy22',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 22,
    page: 3,
    subject: 'dummy23',
    author: 'duddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 23,
    page: 3,
    subject: 'dummy24',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-21',
  },
  {
    id: 24,
    page: 4,
    subject: 'dummy25',
    author: 'duddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 25,
    page: 4,
    subject: 'dummy26',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 26,
    page: 4,
    subject: 'dummy27',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 27,
    page: 4,
    subject: 'dummy28',
    author: 'dbswjd',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-19',
  },
  {
    id: 28,
    page: 4,
    subject: 'dummy29',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 29,
    page: 4,
    subject: 'dummy30',
    author: 'duddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 30,
    page: 4,
    subject: 'dummy31',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 31,
    page: 4,
    subject: 'dummy32',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 32,
    page: 5,
    subject: 'dummy33',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-22',
  },
  {
    id: 33,
    page: 5,
    subject: 'dummy34',
    author: 'alsqja',
    isPrivate: true,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 34,
    page: 5,
    subject: 'dummy35',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 35,
    page: 5,
    subject: 'dummy36',
    author: 'duddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 36,
    page: 5,
    subject: 'dummy37',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 37,
    page: 5,
    subject: 'dummy38',
    author: 'auddn',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-23',
  },
  {
    id: 38,
    page: 5,
    subject: 'dummy39',
    author: 'alsqja',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-02-27',
  },
  {
    id: 39,
    page: 5,
    subject: 'dummy40',
    author: 'dbswjd',
    isPrivate: false,
    createdAt: '2022-02-01',
    expirationDate: '2022-03-01',
  },
];
