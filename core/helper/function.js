export const buildQuery = async function ({ skip, limit, status, id }) {
  const aggregateQuery = [];

  // Match stage
  const matchStage = {};

  if (status) {
    matchStage.status = status;
  }

  if (id) {
    matchStage._id = id;
  }

  if (Object.keys(matchStage).length > 0) {
    aggregateQuery.push({ $match: matchStage });
  }

  // Lookup and project stages
  aggregateQuery.push(
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        _id: 1,
        seat_number: 1,
        status: 1,
        updated_at: 1,
        booking_id: 1,
        journey_time: 1,
        journey_to: 1,
        journey_from: 1,
        created_at: 1,
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
  );

  // Skip and limit stages
  if (skip !== null && skip !== undefined) {
    aggregateQuery.push({ $skip: skip });
  }

  if (limit !== null && limit !== undefined) {
    aggregateQuery.push({ $limit: limit });
  }
  return aggregateQuery;
};
