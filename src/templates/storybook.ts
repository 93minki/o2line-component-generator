export const storybookTemplate = (name: string) => {
  return `
    import { ComponentStory, ComponentMeta } from "@storybook/react";
    import { ${name} } from "./${name}";

    export default {
      title: "components/${name}",
      component: ${name},
    } as ComponentMeta<typeof ${name}>;

    const Template: ComponentStory<typeof ${name}> = (args) => <${name}  {...args}/>;

    export const Default = Template.bind({});

    Default.args = {}
  `;
};
