import React from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { createClient } from "contentful";

// components
import Button from "../../button/Button";

// constants
import {
  HOME_PAGE_TITLE,
  HOME_PAGE_SUBTITLE,
  HOME_PAGE_BUTTONS,
  HOME_PAGE_SEASON_TEXT,
} from "./HomePageConstants";

// styles
import "../../../App.css";
import "./HomePageSection.css";

const simpleAnimation = keyframes`${fadeIn}`;

const FadeInTitle = styled.h1`
  animation: 3s ${simpleAnimation};
`;

const FadeInSubTitle = styled.h4`
  animation: 3s ${simpleAnimation};
`;
const FadeInPara = styled.p`
  animation: 3s ${simpleAnimation};
`;

const FadeInButtons = styled.div`
  animation: 5s ${simpleAnimation};
`;

export default function HomePageSection() {
  const client = createClient({
    space: "5s10ucm8anhl",
    accessToken: "AzH3pFFc0MofFVf8rtX5jHk5LCjiiwk7EtosViYi1WE",
  });

  const [homePageData, setHomePageData] = React.useState({});
  const [homePageBanner, setHomePageBanner] = React.useState("");

  const [homePageBackgroundImage, setHomePageBackgroundImage] =
    React.useState("");

  React.useEffect(() => {
    const fecthData = async () => {
      try {
        const homePageData = await client.getEntry("3JkQKk0Z4C3ZV70MkB9dZh");
        setHomePageData(homePageData);
        setHomePageBanner(
          homePageData?.fields?.homePageBanner?.fields?.file.url
        );
        setHomePageBackgroundImage(
          homePageData.fields?.homePageBackgroundImage?.fields?.file.url
        );
      } catch (error) {
        console.log("==Data not received", error);
      }
    };
    fecthData();
  }, []);

  return (
    <div>
      {homePageBanner && (
        <figure className="banner-class">
          <img
            src={homePageBanner}
            style={{ width: "100%", height: "20vh" }}
            alt="home_page_banner"
          />
        </figure>
      )}
      <div
        style={{
          backgroundImage: `url(${homePageBackgroundImage})`,
          background: "center/cover no-repeat",
        }}
        className="hero-container"
      >
        <FadeInTitle>
          {homePageData.fields?.homePageTitle || HOME_PAGE_TITLE}
        </FadeInTitle>
        <FadeInSubTitle>
          {homePageData.fields?.homePageSubTitle || HOME_PAGE_SUBTITLE}
        </FadeInSubTitle>
        <FadeInPara>
          {homePageData.fields?.homePageSeasonText || HOME_PAGE_SEASON_TEXT}
        </FadeInPara>
        <FadeInButtons className="hero-btns">
          {(
            homePageData.fields?.homePageButtons?.buttons || HOME_PAGE_BUTTONS
          ).map((eachButton, index) => {
            return (
              <Button
                key={index}
                buttonName={eachButton.title}
                className="btns"
                buttonStyle="btn--outline"
                buttonSize="btn--large"
                routeTo={eachButton.linkTo}
              >
                {eachButton.title}
              </Button>
            );
          })}
        </FadeInButtons>
      </div>
    </div>
  );
}
