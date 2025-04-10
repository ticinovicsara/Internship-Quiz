import React from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface UserProps {
  username: string;
  score: number;
}

interface LeaderboardProps {
  sortedUsers: UserProps[];
  score: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ sortedUsers, score }) => {
  console.log("Current Score:", score);

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
          backgroundColor: "#e0f7fa",
          width: "80vw",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ textDecoration: "underline", marginBottom: "10px" }}
        >
          Leaderboard
        </Typography>

        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Rank</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Leaderboard;
