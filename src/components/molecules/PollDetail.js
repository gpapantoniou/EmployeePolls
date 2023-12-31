import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Button, Space, Grid, Title } from "@mantine/core";
import CalculateVotes from "../../utils/CalculateVotes";
import { recordPollAnswer } from "../../redux/reducers/pollReducer";
import { updateQuestionsAnswered } from "../../redux/reducers/userReducer";
import PollManagement from "./PollManagementView";
import AnsweredPollView from "./AnsweredPollView";
import "../../css/App.css";
import AvatarProfile from "../atoms/AvatarProfile";
import NotFound from "../atoms/NotFound";

const PollDetail = () => {
  const { id } = useParams();
  const polls = useSelector((state) => state.polls.value);
  const authUser = useSelector((state) => state.authUser.value);
  const dispatch = useDispatch();

  if (Object.keys(polls).length === 0) return <Loader />;
  const poll = polls[id] ? polls[id] : undefined;
  if (poll === undefined) return <NotFound />;

  const handlePollVote = (event) => {
    const answer = event.currentTarget.id;
    const payload = { authedUser: authUser, qid: id, answer };
    dispatch(recordPollAnswer(payload));
    dispatch(updateQuestionsAnswered(payload));
  };

  const { optionOneVotes, optionTwoVotes, authUserVote } = CalculateVotes(
    poll,
    authUser
  );
  const optionOneVoteTotal = optionOneVotes.total ?? 0;
  const optionTwoVoteTotal = optionTwoVotes.total ?? 0;

  return (
    <div>
      <Space h="lg" />
      <Grid>
        <Grid.Col span="content">
          <AvatarProfile name={poll?.author} size="s" alt="it's me" />
        </Grid.Col>
        <Grid.Col span="content">
          {" "}
          <Title order={1}>Poll by {poll?.author} </Title>
        </Grid.Col>
        <Grid.Col span="auto">
          <Button
            onClick={() => {
              window.history.back();
            }}
            color="blue"
            variant="outline"
            style={{ float: "right", marginRight: "10px" }}
          >
            Back
          </Button>
        </Grid.Col>
      </Grid>
      {authUserVote.vote ? (
        <AnsweredPollView
          poll={poll}
          authUser={authUser}
          authUserVote={authUserVote}
          optionOneVotes={optionOneVoteTotal}
          optionTwoVotes={optionTwoVoteTotal}
        />
      ) : (
        <PollManagement poll={poll} handlePollVote={handlePollVote} />
      )}
    </div>
  );
};

export default PollDetail;
