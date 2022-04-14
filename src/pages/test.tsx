type PageWithConfig = {
  (): JSX.Element;
  hello: boolean;
}

const Page: PageWithConfig = () => <div />;

Page.hello = true;

export default Page;
