import styled from "styled-components";

const HeaderStyle = styled.header`
  .main-container {
    position: absolute;
    background-color: ${(props) => props.theme.drakGreen};
  }
  .nav {
    &bar {
      background-color: ${(props) => props.theme.drakGreen};
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      position: fixed;
      top: 0;
      z-index: 20;
      min-width: 100vw;
      padding: 0 30px 0 30px;
    }

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80px;
    }
    &-logo {
      cursor: pointer;
      color: ${(props) => props.theme.lightGreen};
      align-items: center;
      text-decoration: none;
      font-size: 2rem;
      flex: 1;
      display: inline;
    }
    &-menu {
      display: flex;
      list-style: none;
      text-align: center;
      gap: 50px;
      margin: 0;
    }
    &-links {
      cursor: pointer;
      color: ${(props) => props.theme.lightGreen};
      text-decoration: none;
      height: 100%;
      border: none;
      background-color: transparent;
    }
    &-links:hover {
      text-decoration: underline;
    }
    &-item {
      line-height: 40px;
    }
    &-item:after {
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.7s ease, background-color 0.5s ease;
    }
    &-item.active {
      width: 100vw;
      height: 100vh;
      color: ${(props) => props.theme.lightGreen};
      border: 1px solid ${(props) => props.theme.lightGreen};
    }
    &-icon {
      display: none;
      background-color: transparent;
      border: none;
    }
  }

  @media (max-width: 960px) {
    .nav {
      &-menu {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 80px;
        left: -110%;
        opacity: 1;
        transition: all 0.5s ease;
        padding: 40px;
      }

      &-menu.active {
        background: ${(props) => props.theme.drakGreen};
        left: 0px;
        transition: all 0.5s ease;
      }
      &-item .active {
        color: ${(props) => props.theme.lightGreen};
        border: none;
      }

      &-icon {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        color: ${(props) => props.theme.loghtGreen};
      }
    }
  }
`;

export default HeaderStyle;
