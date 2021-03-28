import React, { useState } from "react";
import styled from "styled-components";
import { BoxContent, Header, Content } from "../styles/BoxContent";
import PendingButton from "../app/templates/pendingbutton";
import Popup from "./popup";
import { getDungeonContract } from "../app/utils/contracthelper";
import RevealComplete from "./revealComplete";
import { GLOBALS } from "../app/utils/globals";

const StyledLoading = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: red;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 80%;
`;

const Loading = ({ show, type, complete }) => {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const revealWaifus = async () => {
    const dungeonContract = await getDungeonContract();
    dungeonContract.methods
      .revealWaifus()
      .send()
      .on("transactionHash", (hash) => {
        setLoading(true);
      })
      .on("receipt", (receipt) => {
        setLoading(false);
        setRevealed(true);
      })
      .on("error", (err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <StyledLoading>
      <Popup
        show={show && !revealed}
        content={
          <BoxContent>
            <Header>
              {complete
                ? "Reveal Waifus"
                : type === "buying"
                ? "Buying Waifus"
                : "Burning Waifus"}
            </Header>
            {!complete && (
              <ErrorText>{GLOBALS.WAIFU_VERSION === "eth" ? `After ${type}, you have 45 minutes to reveal or Waifus will be lost forever. If gas fees show as high, try again in 1 minute.` : `After ${type}, you have 10 minutes to reveal or Waifus will be lost forever. If gas fees seem excessively high, reject the transaction and try again.`}</ErrorText>
            )}
            <Content>
              {complete ? (
                <Image
                  src={
                    "http://cdn.lowgif.com/full/7bcb85f7e2f44370-how-has-love-live-sunshine-changed-the-idol-anime-game-this.gif"
                  }
                  alt="waifu revealing giv"
                />
              ) : type === "buying" ? (
                <Image
                  src={
                    "https://media1.tenor.com/images/40cdfd153b02a70564d7e8604186b48d/tenor.gif"
                  }
                  alt="waifu burning gif"
                />
              ) : (
                <Image
                  src={
                    "https://66.media.tumblr.com/311eed36611a97770bbd34ed7ddf7c51/tumblr_mzlz15oTCC1smhnwfo1_500.gif"
                  }
                  alt="waifu burning gif"
                />
              )}
            </Content>
            <ButtonContainer>
              <PendingButton
                isPending={!complete || loading}
                clickEvent={() => {
                  if (complete) revealWaifus();
                }}
                text="Reveal Waifus"
              />
            </ButtonContainer>
          </BoxContent>
        }
      />
      <RevealComplete show={show && revealed} />
    </StyledLoading>
  );
};

export default Loading;