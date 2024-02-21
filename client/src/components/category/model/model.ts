export interface ICategory {
  _id: string;
  name: string;
  title: string;
  description: string;
  styles: {
    backgroundColor: string;
    flexDirection: string;
    paddingBlock: string;
    paddingInline: string;
    gridRow: string;
    gridColumn: string;
  };
  href: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}
