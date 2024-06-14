import { atom } from "recoil";
interface Blog {
  authorName: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const BlogAtom = atom<Blog[]>({
  key: "blogAtom",
  default: [],
});
