import { useEffect, useState } from "react";
import { fetchAllScores } from "../services/fetchAllScores";
import { User } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { Navigation } from "../components/Navigation";

const UserScoresPage = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchAllScores();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    loadLeaderboard();
  }, []);

  const quizTitles = Array.from(
    new Set(leaderboard.flatMap((user) => Object.keys(user.quizzes || {})))
  );

  return (
    <>
      {" "}
      <Navigation />
      <div
        className="user-scores-page"
        style={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#3f51b5",
            marginBottom: "40px",
          }}
        >
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Rank</strong>
                </TableCell>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                {quizTitles.map((quizTitle) => (
                  <TableCell key={quizTitle}>
                    <strong>{quizTitle}</strong>
                  </TableCell>
                ))}
                <TableCell>
                  <strong>Total points</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((user, index) => (
                <TableRow key={user.username}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  {quizTitles.map((quizTitle) => (
                    <TableCell key={quizTitle}>
                      {user.quizzes[quizTitle] || 0}
                    </TableCell>
                  ))}
                  <TableCell>{user.totalPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserScoresPage;
