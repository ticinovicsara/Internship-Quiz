import React from "react";
import { Box, Card, Typography } from "@mui/material";

interface User {
  username: string;
  score: number;
}

interface LeaderboardProps {
  sortedUsers: User[];
  score: number;
  userRank: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  sortedUsers,
  score,
  userRank,
}) => {
  return (
    <Box
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          backgroundColor: "#F8DE7E",
          width: "70vw",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ textDecoration: "underline", marginBottom: "10px" }}
        >
          Leaderboard
        </Typography>
        {sortedUsers.map((user, index) => (
          <Typography key={index}>
            {index + 1}. {user.username} - {user.score} points
          </Typography>
        ))}
      </Card>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Your score: {score}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "10px" }}>
        Your Rank: {userRank}
      </Typography>
    </Box>
  );
};

export default Leaderboard;
