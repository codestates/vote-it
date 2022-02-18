export interface IPost {
  page: number;
  contents: string;
}

export const getPostList = (page: number): IPost[] => {
  return postList.filter((post: IPost) => post.page === page);
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
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
  {
    page: 1,
    contents: '안녕하세요 1번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 2번째 글',
  },

  {
    page: 1,
    contents: '안녕하세요 3번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 4번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 5번째 글',
  },

  {
    page: 2,
    contents: '안녕하세요 6번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 7번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 8번째 글',
  },

  {
    page: 3,
    contents: '안녕하세요 9번째 글',
  },

  {
    page: 4,
    contents: '안녕하세요 10번째 글',
  },
];
