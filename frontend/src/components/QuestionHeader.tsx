import { Typography } from "@mui/material";

interface QuestionHeaderProps {
  title: string;
  imageURL: string;
}

export function QuestionHeader({ title, imageURL }: QuestionHeaderProps) {
  return (
    <>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        {title}
      </Typography>

      {imageURL && imageURL.trim() !== "" && (
        <img
          src={imageURL}
          alt="Quiz"
          style={{
            width: "100%",
            maxWidth: "450px",
            height: "auto",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />
      )}
    </>
  );
}
