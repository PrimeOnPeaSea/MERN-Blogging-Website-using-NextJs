type Blog = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  user: string;
  date: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export type { Blog, User };
