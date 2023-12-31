export default function AuthUser(
  authUser,
  optionOneVotes,
  optionTwoVotes
) {
  if (optionOneVotes.hasOwnProperty(authUser)) {
    return { vote: "optionOne" };
  } else if (optionTwoVotes.hasOwnProperty(authUser)) {
    return { vote: "optionTwo" };
  } else {
    return { vote: null };
  }
}
