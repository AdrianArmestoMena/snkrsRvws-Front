import styled from "styled-components";

const HeaderStyle = styled.header`
  .navbar {
    background-color: ${(props) => props.theme.drakGreen};
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 30px;
  }

  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    max-width: 1500px;
  }

  .main-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.drakGreen};
  }

  .nav-logo {
    color: ${(props) => props.theme.lightGreen};
    align-items: center;
    text-decoration: none;
    font-size: 2rem;
    flex: 1;
    margin-bottom: 50px;
    display: inline;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    text-align: center;
    margin-right: 2rem;
    padding-bottom: 20px;
  }

  .nav-links {
    color: ${(props) => props.theme.lightGreen};
    text-decoration: none;
    height: 100%;
  }
  .fa-code {
    margin-left: 1rem;
  }

  .nav-item {
    line-height: 40px;
    margin-right: 1rem;
  }

  .nav-item:after {
    display: block;
    height: 3px;
    width: 0;
    background: transparent;
    transition: width 0.7s ease, background-color 0.5s ease;
  }

  .nav-item.active {
    width: 100vw;
    height: 100vh;
    color: ${(props) => props.theme.lightGreen};
    border: 1px solid ${(props) => props.theme.lightGreen};
  }

  .nav-icon {
    display: none;
    background-color: transparent;
    border: none;
  }

  @media (max-width: 960px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: absolute;
      top: 80px;
      left: -110%;
      opacity: 1;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: ${(props) => props.theme.drakGreen};
      left: 0px;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }
    .nav-item .active {
      color: ${(props) => props.theme.lightGreen};
      border: none;
    }

    .nav-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      color: ${(props) => props.theme.loghtGreen};
    }
  }
`;

export default HeaderStyle;
