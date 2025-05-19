declare module "jstat" {
  export const jStat: {
    studentt: {
      inv(probabilidad: number, gradosLibertad: number): number;
    };
  };
}
