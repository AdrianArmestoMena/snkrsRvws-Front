import NotFoundPageStyle from "./NotFoundPage.style";

const NotFoundPage = (): JSX.Element => {
  return (
    <NotFoundPageStyle>
      <span className="code">404</span>
      <h2 className="title">PAGE NOT FOUND</h2>
    </NotFoundPageStyle>
  );
};

export default NotFoundPage;
