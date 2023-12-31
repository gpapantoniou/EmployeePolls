import { Button, Text, Stack, Title } from "@mantine/core";

const PollManagement = ({ handlePollVote, poll }) => {
  return (
    <div>
      <Stack align="center">
        <Title order={2}>Would You Rather?</Title>
        <Button
          className="magic-text1"
          id="optionOne"
          onClick={handlePollVote}
          variant="outline"
        >
          <Text size="xl">{poll?.optionOne.text}</Text>
        </Button>
        <Text size="xl">OR</Text>
        <Button
          className="magic-text2"
          id="optionTwo"
          onClick={handlePollVote}
          variant="outline"
        >
          <Text size="xl">{poll?.optionTwo.text}</Text>
        </Button>
      </Stack>
    </div>
  );
};

export default PollManagement;
