import idFlag from "../assets/flags/id.webp";
export interface IRegion {
  [key: string]: {
    text: string;
    region: string;
    icon: string;
  };
}

const REGION: IRegion = {
  id: {
    text: "Indonesia",
    region: "id",
    icon: idFlag,
  },
};

export default REGION;
