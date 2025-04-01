export interface Quiz {
  id: string;
  title: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  imageURL: string;
}
