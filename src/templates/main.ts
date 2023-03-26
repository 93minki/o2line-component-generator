export const mainTemplate = (name: string) => {
  return `
    import * as S from "./style";

    export const ${name} = () => {
      return <div>Hello ${name}</div>
    }
  `;
};
