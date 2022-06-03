export const getSingleCharity = async (query, variables) => {
  return await fetch("https://charitybase.uk/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Apikey 9447fa04-c15b-40e6-92b6-30307deeb5d1",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
};
